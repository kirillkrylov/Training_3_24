define("ExpenseReportPage", ["ServiceHelper"], function(ServiceHelper) {
	return {
		entitySchemaName: "ExpenseReport",
		attributes: {
			//https://academy.creatio.com/documents/technic-sdk/7-15/adding-calculated-fields
			"Total" : {
				dataValueType: Terrasoft.DataValueType.FLOAT,
				dependencies: [
					{
						columns: ["Total"],
						methodName: "onTotalChanged"
					}
				]
			}
		},
		messages:{
			"MessageWithResult": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "ExpenseReportFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "ExpenseReport"
				}
			},
			"ExpenseReportLinesDetails": {
				"schemaName": "ExpenseReportLinesDetail",
				"entitySchemaName": "ExpenseReportLines",
				"filter": {
					"detailColumn": "ExpenseReport",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			
			init: function(){
				this.callParent(arguments);
				this.subscribeToWebSocketMessages();
				this.sandbox.subscribe("MessageWithResult", this.onMessageSubscribe, this, ["resultTag"]);
			},
			
			onMessageSubscribe: function(arg){
				
				
				debugger;
				this.showInformationDialog("Message received");
			},
			
			
			destroy: function() {
				this.unsubscribeServerChannelEvents();
				this.callParent(arguments);
			},
			onEntityInitialized: function() {
				this.callParent(arguments);
				//this.onTotalChanged();
			},
			
			
			/**Validation**/
			setValidationConfig: function() {
                // This calls the initialization of validators for the parent view model.
                this.callParent(arguments);
                // The dueDateValidator() validate method is added for the [DueDate] column.
                this.addColumnValidator("ReportDate", this.reportDateValidator);
			},
			
			reportDateValidator: function(){
				var invalidMessage = "";
                if (this.get("ReportDate") <= this.get("CreatedOn")) {
                    invalidMessage = "Invalid Date";
                }
                 // Object whose properties contain validation error messages.
                 // If the validation is successful, empty strings are returned to the
                 // object.
                return {
                    // Validation error message.
                    invalidMessage: invalidMessage
                };
			
				
			},
			
			
			
			
			/**END OF Validation**/
			
			
			
			
			
			
			
			
			
			
			
			onWsClick: function(){
				var serviceData = {
                        name: this.$Name
                    };
                    
                ServiceHelper.callService("DemoService", "GetErSumEsq",
                    function(response) {
                        var result = response.GetErSumEsqResult;
                        this.showInformationDialog(result);
                    }, serviceData, this);
			},
			
			onESQLClick: function(){
				
				// Creation of query instance with "ExpenseReportLines" root schema. 
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				    rootSchemaName: "ExpenseReportLines"
				});
				esq.addColumn("AmountHC");
				esq.addColumn("AmountFC");
				
				// Creation of the first filter instance.
				var mainId = this.$Id;
				var esqFirstFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "ExpenseReport", mainId);
				esq.filters.add("esqFirstFilter", esqFirstFilter);
				
				
				var sumHC = 0.00;
				var sumFC = 0.00;

				// This collection will include objects, i.e. query results, filtered by two filters.
				esq.getEntityCollection(function (result) {
				    if (result.success) {
				        result.collection.each(function (item) {
				            sumHC += this.$AmountHC;
				            sumFC += this.$AmountFC;
				        });
				        this.showInformationDialog(sumHC +" "+sumFC);
				    }
				}, this);
				
				
			},
			
			
			onTotalChanged : function(){
				var amount = this.$Total;
				if(amount>=10000){
					this.showInformationDialog("Expense report exceeds 10K");
				}
			},
			subscribeToWebSocketMessages: function(){
				this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE, this.onServerChannelMessageReceived, this);
			},
			onServerChannelMessageReceived: function(sender, message){
				var mySender = message.Header.Sender;
				var myBody = message.Body;
				
				if(mySender === "ExpenseReportLinesListener"){
					if(myBody==="UpdatedExpenseReport"){
						this.reloadEntity();
						
					}else if (myBody==="UpdatedExpenseReportLine"){
						this.updateDetail({detail: "ExpenseReportLinesDetails"});
					}
				}
				else{return;}
				
				
				
			},
			unsubscribeServerChannelEvents: function() {
				this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE, this.onServerChannelMessageReceived, this);
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Name",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Name"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Contact",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Contact",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ReportDate",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "ReportDate",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Total",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Total",
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			
			/** My BUttons */
			
			{
				"operation": "insert",
				"name": "ESQButton",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"hint": "Get sum of details with standard ESQ",
					"style": this.Terrasoft.controls.ButtonEnums.style.GREEN,
					"tag": "ESQButton",
					"caption": "Get SUM ESQ",
					"click": {
						"bindTo": "onESQLClick"
					},
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "WSButton",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"hint": "Get sum of details with custom WebService",
					"style": this.Terrasoft.controls.ButtonEnums.style.BLUE,
					"tag": "WSButton",
					"caption": "Get sum WS",
					"click": {
						"bindTo": "onWsClick"
					},
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			
			/** End of My BUttons */
			
			{
				"operation": "insert",
				"name": "TabFinancial",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.TabFinancial"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ExpenseReportLinesDetails",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "TabFinancial",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "Notes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
