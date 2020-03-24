define("ExpenseReportLines6f0c3ef6Page", [], function() {
	return {
		entitySchemaName: "ExpenseReportLines",
		attributes: {},
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
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "ExpenseReport8897a310-2f4b-445d-b317-94a19439f54a",
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
				"name": "Notes0e6a1c08-358d-4d56-96d0-b75cbd26e159",
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
				"name": "AmountFC7b2bde60-82ea-41e7-8fb9-33c778fc28c1",
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
				"name": "Currencyad94dc70-f83b-43b4-b2ac-4debd80bd365",
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
				"name": "AmountHC0a03956b-6f65-4e2a-83bf-c0837f7b0803",
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
				"name": "LOOKUPba411831-3669-4c85-aa2e-3f201c0662ee",
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
				"name": "LOOKUP01c6bc9d-6331-4960-8b0a-1c2f531fde34",
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
