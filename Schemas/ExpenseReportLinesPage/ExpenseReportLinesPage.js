define("ExpenseReportLinesPage", [], function() {
	return {
		entitySchemaName: "ExpenseReportLines",
		attributes: {
			"AmountFC" : {
				dataValueType: Terrasoft.DataValueType.FLOAT,
				dependencies: [
					{
						columns: ["AmountFC"],
						methodName: "onAmountFcChanged"
					}
				]
			}
			
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"GL": {
				"551de704-0274-4f4f-82f7-8a2d5d776560": {
					"uId": "551de704-0274-4f4f-82f7-8a2d5d776560",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Category",
					"comparisonType": 3,
					"type": 1,
					"attribute": "Category"
				}
			},
			"Notes": {
				"f91c984e-055d-4a98-9c86-baaa64e94e61": {
					"uId": "f91c984e-055d-4a98-9c86-baaa64e94e61",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 7,
							"leftExpression": {
								"type": 1,
								"attribute": "AmountHC"
							},
							"rightExpression": {
								"type": 0,
								"value": 1000,
								"dataValueType": 4
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			
			init: function(){
				this.callParent(arguments);
				this.sandbox.registerMessages("MessageWithResult");
			},
			
			onAmountFcChanged: function(){
				var arg = {payload:"This is a sample payload"};
				this.sandbox.publish("MessageWithResult", arg, ["resultTag"]);
			}
		},
		messages:{
			"MessageWithResult": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "ExpenseReport",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "ExpenseReport",
					"enabled": false,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 3,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Notes",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "AmountFC",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "AmountFC"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Currency",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "Currency"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "AmountHC",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "AmountHC"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Category",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "Category",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "GL",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "GL",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			}
		]/**SCHEMA_DIFF*/
	};
});
