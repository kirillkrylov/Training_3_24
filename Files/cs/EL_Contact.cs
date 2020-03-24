using global::Common.Logging;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace Training.Files.cs.el
{
    /// <summary>
    /// Listener for 'EntityName' entity events.
    /// </summary>
    /// <seealso cref="Terrasoft.Core.Entities.Events.BaseEntityEventListener" />
    [EntityEventListener(SchemaName = "Contact")]
    class EL_Contact : BaseEntityEventListener
    {
        private static readonly ILog _log = LogManager.GetLogger("TrainingLogger");
        public override void OnSaved(object sender, EntityAfterEventArgs e)
        {
            base.OnSaved(sender, e);
            Entity entity = (Entity)sender;
            //UserConnection userConnection = entity.UserConnection;

            //string message = $"Changing name for {entity.GetTypedColumnValue<string>("Name")}";
            //_log.Info(message);
        }
        public override void OnSaving(object sender, EntityBeforeEventArgs e)
        {
            base.OnSaving(sender, e);
            Entity entity = (Entity)sender;
            string oldName = entity.GetTypedOldColumnValue<string>("Name");
            string newName = entity.GetTypedColumnValue<string>("Name");

            entity.SetColumnValue("Name", $"Changing from {oldName } to {newName}");

            MsgChannelUtilities.PostMessage(entity.UserConnection, GetType().Name, "our first message");
            
            entity.Save();



            //UserConnection userConnection = entity.UserConnection;

            //string message = $"Changing name for {entity.GetTypedColumnValue<string>("Name")}";
            //_log.Info(message);
        }



    }
}