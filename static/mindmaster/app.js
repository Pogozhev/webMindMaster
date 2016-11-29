;
(function () {
	jsPlumbToolkit.ready(function () {

// ------------------------ toolkit setup ------------------------------------

		// This function is what the toolkit will use to get an ID from a node.
		var idFunction = function (n) {
			return n.id;
		};

		// This function is what the toolkit will use to get the associated type from a node.
		var typeFunction = function (n) {
			return n.type;
		};

		// get the various dom elements
		var mainElement = document.querySelector("#mindmap"),
			canvasElement = mainElement.querySelector(".mindmap-canvas"),
			miniviewElement = mainElement.querySelector(".miniview"),
			nodePalette = mainElement.querySelector(".node-palette"),
			controls = mainElement.querySelector(".controls");

		var tree_id = document.querySelector(".tree_id");
		console.log(tree_id.value);

		// Declare an instance of the Toolkit, and supply the functions we will use to get ids and types from nodes.
		var toolkit = jsPlumbToolkit.newInstance({
			autoSave: true,
			saveUrl: "/savetree/"+tree_id.value,

			idFunction: idFunction,
			typeFunction: typeFunction,
			nodeFactory: function (type, data, callback) {
				data.columns = [];
				jsPlumbToolkit.Dialogs.show({
					id: "dlgName",
					title: "Enter " + type + " name:",
					onOK: function (d) {
						data.name = d.name;
						// if the user entered a name...
						if (data.name) {
							if (data.name.length >= 2) {
								// generate an id: replace spaces with underscores, and make lower case
								data.id = data.name.replace(" ", "_").toLowerCase();
								callback(data);
							}
							else
								alert(type + " names must be at least 2 characters!");
						}
						// else...do not proceed.
					}
				});
			},
			edgeFactory: function (params, data, callback) {
				// you must hit the callback if you provide the edgeFactory.
				callback(data);
				// unless you want to return false, to abandon the edge
				//return false;
			},
			portFactory: function (params, data, callback) {
				// add to node. we have to do this manually. the Toolkit does not know our internal
				// data structure.
				params.node.data.columns.push(data);
				// handoff the new column.
				callback(data);
			},
			//
			// For a given Node, return the parts of its dataset that we want to configure as Ports.
			// This is called when the data is being loaded. It is an optional argument to the newInstance
			// method.
			//
			portExtractor: function (data, node) {
				return data.columns || [];
			},
			//
			// Prevent connections from a column to itself or to another column on the same table.
			//
//			beforeConnect:function(source, target) {
//				return source !== target && source.getNode() !== target.getNode();
//			}
//			beforeStartDetach: function() { return false; }
		});


// ------------------------ / toolkit setup ------------------------------------

// ------------------------- dialogs -------------------------------------

		jsPlumbToolkit.Dialogs.initialize({
			selector: ".dlg"
		});

// ------------------------- / dialogs ----------------------------------

// ------------------------- behaviour ----------------------------------

		// delete column button
		jsPlumb.on(canvasElement, "tap", ".table-column-delete, .table-column-delete i", function () {
			var info = renderer.getObjectInfo(this);
			jsPlumbToolkit.Dialogs.show({
				id: "dlgConfirm",
				data: {
					msg: "Delete column '" + info.id + "'"
				},
				onOK: function (data) {
					toolkit.removePort(info.obj.getNode(), info.id);
				},
				onOpen:function(el) {
					console.dir(el);
				}
			});
		});

		// add a new table
		jsPlumb.on(canvasElement, "tap", ".new-table i", function () {
			var info = renderer.getObjectInfo(this);

			jsPlumbToolkit.Dialogs.show({
				id: "dlgName",
				data: {
					name: "New table"
				},
				title: "New " + info.obj.data.type + " name",
				onOK: function (data) {
					if (data.name && data.name.length > 0) {
						// if name is at least 2 chars long, update the underlying data and
						// update the UI.
						data.type = info.obj.data.type;
						data.columns = [];
						var newNode = toolkit.addNode(data);
						toolkit.addEdge({source: info.obj, target: newNode});
						console.log(info.obj.data);
						console.log(data);
					}
				}
			});
			//var newNode = toolkit.addNode(n);
			// and add an edge for it from the current node.
			
			//renderer.refresh();
		});

		// add new column to table
		jsPlumb.on(canvasElement, "tap", ".new-column, .new-column i", function () {
			// getObjectInfo is a helper method that retrieves the node or port associated with some
			// element in the DOM.
			var info = renderer.getObjectInfo(this);

			jsPlumbToolkit.Dialogs.show({
				id: "dlgColumnEdit",
				data: {
					id: "New column"
				},
				title: "Column Details",
				onOK: function (data) {
					// if the user supplied a column name, tell the toolkit to add a new port, providing it the
					// id and name of the new column.  This will result in a callback to the portFactory defined above.
					if (data.id) {
						if (data.id.length < 2)
							alert("Column ids must be at least 2 characters!");
						else {
							toolkit.addNewPort(info.id, "column", {
								id: data.id.replace(" ", "_").toLowerCase(),
								primaryKey: data.primaryKey,
								datatype: data.datatype
							});
						}
					}
				}
			});
		});

		// delete a table or view
		jsPlumb.on(canvasElement, "tap", ".delete i, .view-delete i", function () {
			var info = renderer.getObjectInfo(this);

			jsPlumbToolkit.Dialogs.show({
				id: "dlgConfirm",
				data: {
					msg: "Delete '" + info.id
				},
				onOK: function (data) {
					toolkit.removeNode(info.id);
				}
			});

		});

		// edit a view's query
/*		jsPlumb.on(canvasElement, "tap", ".view .edit i", function () {
			var info = renderer.getObjectInfo(this);
			jsPlumbToolkit.Dialogs.show({
				id: "dlgViewQuery",
				data: info.obj.data,
				onOK: function (data) {
					// update data, and UI (which works only if you use the Toolkit's default template engine, Rotors.
					toolkit.updateNode(info.obj, data);
				}
			});
		});
*/
		// change a view or table's name
		jsPlumb.on(canvasElement, "tap", ".view .name span, .table .name span", function () {
			// getObjectInfo is a method that takes some DOM element (this function's `this` is
			// set to the element that fired the event) and returns the toolkit data object that
			// relates to the element.
			var info = renderer.getObjectInfo(this);
			jsPlumbToolkit.Dialogs.show({
				id: "dlgName",
				data: info.obj.data,
				title: "Edit " + info.obj.data.type + " name",
				onOK: function (data) {
					if (data.name && data.name.length > 2) {
						// if name is at least 2 chars long, update the underlying data and
						// update the UI.
						toolkit.updateNode(info.obj, data);
					}
				}
			});
		});

		// edit an edge's detail
/*		var _editEdge = function (edge, isNew) {
			jsPlumbToolkit.Dialogs.show({
				id: "dlgRelationshipType",
				data: edge.data,
				onOK: function (data) {
					// update the type in the edge's data model...it will be re-rendered.
					// `type` is set in the radio buttons in the dialog template.
					data.type = "common";
					console.log(data);
					toolkit.updateEdge(edge, data);
				},
				onCancel: function () {
					// if the user pressed cancel on a new edge, delete the edge.
					if (isNew) toolkit.removeEdge(edge);
				}
			});
		};
*/
		// edit a column's details
		jsPlumb.on(canvasElement, "tap", ".table-column-edit i", function () {
			var info = renderer.getObjectInfo(this);
			jsPlumbToolkit.Dialogs.show({
				id: "dlgColumnEdit",
				title: "Column Details",
				data: info.obj.data,
				onOK: function (data) {
					// if the user supplied a column name, tell the toolkit to add a new port, providing it the
					// id and name of the new column.  This will result in a callback to the portFactory defined above.
					if (data.id) {
						if (data.id.length < 2)
							jsPlumbToolkit.Dialogs.show({id: "dlgMessage", msg: "Column ids must be at least 2 characters!"});
						else
							toolkit.updatePort(info.obj, {
								id: data.id.replace(" ", "_").toLowerCase(),
								primaryKey: data.primaryKey,
								datatype: data.datatype
							});
					}
				}
			});
		});

// ------------------------- / behaviour ----------------------------------

// ------------------------ rendering ------------------------------------

		// Instruct the toolkit to render to the 'canvas' element. We pass in a model of nodes, edges and ports, which
		// together define the look and feel and behaviour of this renderer.  Note that we can have 0 - N renderers
		// assigned to one instance of the Toolkit..
		var renderer = window.renderer = toolkit.render({
			container: canvasElement,
			view: {
				// Two node types - 'table' and 'view'
				nodes: {
					"table": {
						template: "tmplTable"
					}
				},
				// Three edge types  - '1:1', '1:N' and 'N:M',
				// sharing  a common parent, in which the connector type, anchors
				// and appearance is defined.
				edges: {
					"default": {
						anchor: [  "Bottom", "Top" ], // anchors for the endpoints  "Left", "Right",
						connector: "StateMachine",  //  StateMachine connector type
						cssClass: "common-edge",
						events: {
							"dbltap": function (params) {
								_editEdge(params.edge);
							}
						},
						
					},
				},
				// There is only one type of Port - a column - so we use the key 'default' for the port type
				// Here we define the appearance of this port,
				// and we instruct the Toolkit what sort of Edge to create when the user drags a new connection
				// from an instance of this port. Note that we here we tell the Toolkit to create an Edge of type
				// 'common' because we don't know the cardinality of a relationship when the user is dragging. Once
				// a new relationship has been established we can ask the user for the cardinality and update the
				// model accordingly.
				ports: {
					"default": {
						template: "tmplColumn",
						paintStyle: { fill: "#f76258" },        // the endpoint's appearance
						hoverPaintStyle: { fill: "#434343" }, // appearance when mouse hovering on endpoint or connection
						edgeType: "common", // the type of edge for connections from this port type
						maxConnections: -1, // no limit on connections
						dropOptions: {  //drop options for the port. here we attach a css class.
							hoverClass: "drop-hover"
						},
						allowLoopback: false,   // do not allow loopback connections from a port to itself.
						allowNodeLoopback:false, // do not allow connections from this port to any other port on the same node.
						events: {
							"dblclick": function () {
								console.log(arguments);
							}
						}
					}
				}
			},
			// Layout the nodes using a 'Spring' (force directed) layout. This is the best layout in the jsPlumbToolkit
			// for an application such as this.
			layout: {
				type: "Hierarchical",
				parameters: {
					orientation: "horizontal",
					padding: [60, 60]
				},
				multipleRoots:false
			},
			miniview: {
				container: miniviewElement
			},
			// Register for certain events from the renderer. Here we have subscribed to the 'nodeRendered' event,
			// which is fired each time a new node is rendered.  We attach listeners to the 'new column' button
			// in each table node.  'data' has 'node' and 'el' as properties: node is the underlying node data,
			// and el is the DOM element. We also attach listeners to all of the columns.
			// At this point we can use our underlying library to attach event listeners etc.
			events: {
				// This is called by the Toolkit when a new Port is added to a Node. In this application, that occurs
				// when the user adds a new column to a table. It is instigated by the application code preparing the
				// JS data for a new column, and then calling toolkit.portAdded(node, portData); Note that the
				// application also adds the data to the backing model itself.
				// In this application, the portElement was rendered by the 'tmplColumn' template, and it is an LI.
				// the nodeElement was rendered by 'tmplTable', and it has a UL inside of it to which we want to attach
				// the column's LI.
				portAdded: function (params) {
					params.nodeEl.querySelectorAll("ul")[0].appendChild(params.portEl);
				},
				edgeAdded: function (params) {
					// Check here that the edge was not added programmatically, ie. on load.
					if (params.addedByMouse) {
						_editEdge(params.edge, true);
					}
				},
				canvasClick: function (e) {
					toolkit.clearSelection();
				}
			},
			dragOptions: {
				filter: "i, .view .name span, .table .name span, .table-column *"
			},

			consumeRightClick: false,
			zoomToFit:true,
			elementsDraggable: false,
			jsPlumb:{
				Anchors: ["Bottom", "Top"],
				Connector: [ "StateMachine", { curviness: 10 } ],
				PaintStyle: { lineWidth: 1, stroke: '#89bcde' },
				HoverPaintStyle: { stroke: "#FF6600", lineWidth: 3 },
				Endpoints: [
					[ "Dot", { radius: 2 } ],
					"Blank"
				],
				EndpointStyle: { fill: "#89bcde" },
				EndpointHoverStyle: { fill: "#FF6600" }
			},
		});

		jsPlumb.on(controls, "tap", "[save]", function () {
			toolkit.save({
				url: "/savetree/"+tree_id.value,
			})
		});

		jsPlumb.on(controls, "tap", "[addroot]", function () {
			toolkit.clearSelection();
			renderer.zoomToFit();
		});

		// listener for mode change on renderer.
		renderer.bind("modeChanged", function (mode) {
			jsPlumb.removeClass(controls.querySelectorAll("[mode]"), "selected-mode");
			jsPlumb.addClass(controls.querySelectorAll("[mode='" + mode + "']"), "selected-mode");
		});

		// pan mode/select mode
		jsPlumb.on(controls, "tap", "[mode]", function () {
			renderer.setMode(this.getAttribute("mode"));
		});

		// on home button click, zoom content to fit.
		jsPlumb.on(controls, "tap", "[reset]", function () {
			toolkit.clearSelection();
			renderer.zoomToFit();
		});

// ------------------------ / rendering ------------------------------------



// ------------------------ loading  ------------------------------------

		// Load the data.
		toolkit.load({
//			type:"hierarchical-json",
			url: "/mindmap/"+tree_id.value,
//			url: "02.json"
		});

// ------------------------ /loading  ------------------------------------

	});
})();