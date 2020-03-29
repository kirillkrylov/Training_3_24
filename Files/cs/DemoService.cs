using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;
using Terrasoft.Common;
using Terrasoft.Core.DB;
using Terrasoft.Core.Entities;
using Terrasoft.Web.Common;





namespace Training.Files.cs
{
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    class DemoService : BaseService
    {
        //http://k_krylov_nb:8040/0/rest/DemoService/GetErSum?name=Record%201

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public decimal GetErSum(string name) 
        {
            decimal sum = decimal.Zero;



            //Search for Parent Id
            Select selectER = new Select(UserConnection)
                .Column("Id")
                .From("ExpenseReport")
                .Where("Name").IsEqual(Column.Parameter(name)) as Select;

            Guid Id = selectER.ExecuteScalar<Guid>();





            //Sum up all lines

            Select select = new Select(UserConnection)
                .Column("AmountHC")
                .Column("AmountFC")
                .From("ExpenseReportLines")
                .Where("ExpenseReportId").IsEqual(Column.Parameter(Id)) as Select;


            decimal amountHc = decimal.Zero;
            //decimal amountFc = decimal.Zero;

            using (DBExecutor executor = UserConnection.EnsureDBConnection())
            {
                using (IDataReader dataReader = select.ExecuteReader(executor))
                {

                    while (dataReader.Read())
                    {
                        amountHc = Convert.ToDecimal(dataReader.GetValue(dataReader.GetOrdinal("AmountHC")));
                        //amountFc = Convert.ToDecimal(dataReader.GetValue(dataReader.GetOrdinal("AmountFC")));

                        sum += amountHc;
                        var a = dataReader;

                    }
                }

            }

            return sum;
        }


        //http://k_krylov_nb:8040/0/rest/DemoService/GetErSumEsq?name=Record%201


        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public decimal GetErSumEsq(string name) 
        {

            EntitySchemaQuery parent = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "ExpenseReport");
            parent.AddColumn("Id");
            parent.PrimaryQueryColumn.IsVisible = true;
            parent.AddColumn("Name");
            parent.AddColumn("ReportDate");
            parent.AddColumn("Total");

            var idFilter = parent.CreateFilterWithParameters(FilterComparisonType.Equal, "Name", name);
            parent.Filters.LogicalOperation = LogicalOperationStrict.And;
            parent.Filters.Add(idFilter);

            EntityCollection records = parent.GetEntityCollection(UserConnection);
            DateTime ReportDate = records[0].GetTypedColumnValue<DateTime>("ReportDate");
            Guid ParentId = records[0].PrimaryColumnValue;

            EntitySchemaQuery children = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "ExpenseReportLines");
            children.AddColumn("ExpenseReport");
            children.AddColumn("AmountHC");
            
            var parentFilter = children.CreateFilterWithParameters(FilterComparisonType.Equal, "ExpenseReport", ParentId);
            children.Filters.LogicalOperation = LogicalOperationStrict.And;
            children.Filters.Add(parentFilter);
            
            EntityCollection rows = children.GetEntityCollection(UserConnection);
            decimal sum = decimal.Zero;
            foreach (Entity row in rows) 
            {
                sum+=row.GetTypedColumnValue<decimal>("AmountHC");
            }

            records[0].SetColumnValue("Total", sum);
            records[0].Save();
                     
            return sum;

        }


        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public string DemoMethodElse(string name)
        {
            return "OK " + name;
        }
    }
}
