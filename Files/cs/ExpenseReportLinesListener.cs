using global::Common.Logging;
using System;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;
using ForeignExchange;
using System.Threading.Tasks;
using Terrasoft.Core.DB;
using Newtonsoft.Json;


namespace Training.Files.cs
{
    [EntityEventListener(SchemaName = "ExpenseReportLines")]
    class ExpenseReportLinesListener : BaseEntityEventListener
    {
        private UserConnection userConnection { get; set; }

        private static readonly ILog _log = LogManager.GetLogger("TrainingLogger");
        public override void OnSaved(object sender, EntityAfterEventArgs e)
        {
            base.OnSaved(sender, e);
            Entity entity = (Entity)sender;
            userConnection = entity.UserConnection;
            
            string[] ObservableColumns = { "AmountHC", "AmountFC", "Currency" };
            bool isChangeInteresting = false;

            foreach (EntityColumnValue mc in e.ModifiedColumnValues) {
                if (Array.IndexOf(ObservableColumns, mc.Column.Name) > -1)
                    isChangeInteresting = true;
            }

            if (!isChangeInteresting) return;

            
            Guid currencyId = entity.GetTypedColumnValue<Guid>("CurrencyId");
            string currencyName = GetCurrencyName(currencyId);

            IBank bank = BankFactory.GetBank(BankFactory.SupportedBanks.BOC);
            IBankResult bankResult = Task.Run(() => bank.GetRateAsync(currencyName, DateTime.Today)).Result;
            
            decimal rate = bankResult.ExchangeRate;

            decimal amountFC = entity.GetTypedColumnValue<decimal>("AmountFC");
            decimal amountHC = rate * amountFC;
            entity.SetColumnValue("AmountHC", amountHC);
            entity.Save();

            Guid expenseReportId = entity.GetTypedColumnValue<Guid>("ExpenseReportId");
            UpdateExpenseReport(entity.UserConnection, expenseReportId);

            MsgChannelUtilities.PostMessage(userConnection, GetType().Name, "UpdatedExpenseReportLine");
        }

        public override void OnDeleted(object sender, EntityAfterEventArgs e) 
        {
            base.OnDeleted(sender, e);
            Entity entity = (Entity)sender;
            var Id = entity.GetTypedColumnValue<Guid>("Id");
            var expenseReportId = entity.GetTypedColumnValue<Guid>("ExpenseReportId");
            UpdateExpenseReport(entity.UserConnection, expenseReportId);
        }

        /// <summary>
        /// Calculates sum of all lines
        /// </summary>
        /// <param name="userConnection"></param>
        /// <param name="lineId">ExpenseReportLineId</param>
        /// <returns>Tuple<decimal, decimal>(totalHC, totalFC)</returns>
        private Tuple<decimal, decimal> CalculateSum(UserConnection userConnection, Guid ExpenseReportId) 
        {
            Select select = new Select(userConnection)
                .Column("AmountHC")
                .Column("AmountFC")
                .From("ExpenseReportLines")
                .Where("ExpenseReportId").IsEqual(Column.Parameter(ExpenseReportId)) as Select;

            decimal totalHC = decimal.Zero;
            decimal totalFC = decimal.Zero;
            using (DBExecutor executor = userConnection.EnsureDBConnection())
            {
                using (var reader = select.ExecuteReader(executor))
                {
                    while (reader.Read())
                    {
                        decimal.TryParse(reader["AmountHC"].ToString(), out decimal amountHC);
                        decimal.TryParse(reader["AmountFC"].ToString(), out decimal amountFC);

                        totalHC += amountHC;
                        totalFC += amountFC;
                    }
                }
            }

            return new Tuple<decimal, decimal>(totalHC, totalFC);
        }
   
        private string GetCurrencyName(Guid Id) 
        {
            Select select = new Select(userConnection)
                .Column("ShortName")
                .From("Currency")
                .Where("Id").IsEqual(Column.Parameter(Id)) as Select;

            return select.ExecuteScalar<string>();
        }

        private void UpdateExpenseReport(UserConnection userConnection, Guid Id) 
        {
            Entity expenseReport = userConnection.EntitySchemaManager.GetInstanceByName("ExpenseReport").CreateEntity(userConnection);
            expenseReport.FetchFromDB(Id);
            Tuple<decimal, decimal> sum = CalculateSum(userConnection, Id);

            expenseReport.SetColumnValue("Total", sum.Item1);
            //expenseReport.SetColumnValue("TotalFC", sum.Item2);
            expenseReport.Save();
            MsgChannelUtilities.PostMessage(userConnection, GetType().Name, "UpdatedExpenseReport");
        }


    }
}
