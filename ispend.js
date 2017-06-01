function insertdata()
				{
			
							var id = window.localStorage.getItem('lastid');
							
							var spendammount = document.forms['clientForm'].sammount.value; //ammount
							var category = document.forms['clientForm'].categ.value; //category
							var necessary = document.forms['clientForm'].nec.checked; //anagaio
							var userdata = {'Category_selection': category, 'Ammount_selection': spendammount, 'Necessary_selection': necessary };
							
							
							if(spendammount != "")
							{
								if ((typeof(Storage) !== "undefined")) 
								{
										for (var prop in userdata) {
											console.log('  ' + prop + ': ' + userdata[prop]);
									}
									localStorage.setItem(id, JSON.stringify(userdata));	
									edit_counters(id, "add");									
									id++;
									localStorage.setItem('lastid',id);
								}
								
							}
							
							clear_form();
				}
				
function set_counters()
				{
					
					
						
						
					if (window.localStorage.getItem('lastid')== null){
						localStorage.setItem('lastid',1);
						//console.log(window.localStorage.getItem('lastid') + "last id null");
					}
					
					if(window.localStorage.getItem("food_sumammount_nec") == null)
										window.localStorage.setItem("food_sumammount_nec",0);
					if(window.localStorage.getItem("super_sumammount_nec") == null)
										window.localStorage.setItem("super_sumammount_nec",0);
					if(window.localStorage.getItem("car_sumammount_nec") == null)
										window.localStorage.setItem("car_sumammount_nec",0);
					if(window.localStorage.getItem("ent_sumammount_nec") == null)
										window.localStorage.setItem("ent_sumammount_nec",0);
					if(window.localStorage.getItem("pers_sumammount_nec") == null)
										window.localStorage.setItem("pers_sumammount_nec",0);
					if(window.localStorage.getItem("voc_sumammount_nec") == null)
										window.localStorage.setItem("voc_sumammount_nec",0);
					if(window.localStorage.getItem("other_sumammount_nec") == null)
										window.localStorage.setItem("other_sumammount_nec",0);
					if(window.localStorage.getItem("food_sumammount_not_nec") == null)
										window.localStorage.setItem("food_sumammount_not_nec",0);
					if(window.localStorage.getItem("super_sumammount_not_nec") == null)
										window.localStorage.setItem("super_sumammount_not_nec",0);
					if(window.localStorage.getItem("car_sumammount_not_nec") == null)
										window.localStorage.setItem("car_sumammount_not_nec",0);
					if(window.localStorage.getItem("pers_sumammount_not_nec") == null)
										window.localStorage.setItem("pers_sumammount_not_nec",0);
					if(window.localStorage.getItem("ent_sumammount_not_nec") == null)
										window.localStorage.setItem("ent_sumammount_not_nec",0);
					if(window.localStorage.getItem("voc_sumammount_not_nec") == null)
										window.localStorage.setItem("voc_sumammount_not_nec",0);
					if(window.localStorage.getItem("other_sumammount_not_nec") == null)
										window.localStorage.setItem("other_sumammount_not_nec",0);
				}
function clear_form()
				{
					
					document.getElementById("clientForm").reset();
				}				
					
function clear_all()
				{
					localStorage.clear();
					
				}				
				
function show_content(selection)
				{
					set_counters();
					if(selection=="new")
					{
						document.getElementById("nav_new").classList.add('selected');
						document.getElementById("nav_stats").classList.remove('selected');
						document.getElementById("nav_edit").classList.remove('selected');
						document.getElementById("new").style.display = "block";
						document.getElementById("stats").style.display = "none";
						document.getElementById("edit").style.display = "none";
						
						
					}
					else if (selection=="stats")
					{
						document.getElementById("nav_stats").classList.add('selected');
						document.getElementById("nav_new").classList.remove('selected');
						document.getElementById("nav_edit").classList.remove('selected');
						document.getElementById("new").style.display = "none";
						document.getElementById("stats").style.display = "block";
						document.getElementById("edit").style.display = "none";
						showstats();
						
					}
					else
					{
						document.getElementById("nav_edit").classList.add('selected');
						document.getElementById("nav_new").classList.remove('selected');
						document.getElementById("nav_stats").classList.remove('selected');
						document.getElementById("new").style.display = "none";
						document.getElementById("stats").style.display = "none";
						document.getElementById("edit").style.display = "block";
						showedit();
					}
				}

function showstats()
				{
					google.charts.load("current", {packages:['corechart']});
					google.charts.setOnLoadCallback(drawChart);
					function drawChart() {
							  var data = google.visualization.arrayToDataTable([
							  ['Κατηγορία', 'Αναγκαίο', 'Μη Αναγκαίο'],
							  ['Φαγητό/Ποτό',  parseInt(window.localStorage.getItem("food_sumammount_nec")), parseInt(window.localStorage.getItem("food_sumammount_not_nec"))],
							  ['Supermarket', parseInt(window.localStorage.getItem("super_sumammount_nec")), parseInt(window.localStorage.getItem("super_sumammount_not_nec"))],
							  ['Αυτοκίνητο', parseInt(window.localStorage.getItem("car_sumammount_nec")), parseInt(window.localStorage.getItem("car_sumammount_not_nec"))],
							  ['Διασκέδαση', parseInt(window.localStorage.getItem("ent_sumammount_nec")), parseInt(window.localStorage.getItem("ent_sumammount_not_nec"))],
							  ['Προσωπικά', parseInt(window.localStorage.getItem("pers_sumammount_nec")), parseInt(window.localStorage.getItem("pers_sumammount_not_nec"))],
							  ['Διακοπές', parseInt(window.localStorage.getItem("voc_sumammount_nec")), parseInt(window.localStorage.getItem("voc_sumammount_not_nec"))],
							  ['Άλλο', parseInt(window.localStorage.getItem("other_sumammount_nec")), parseInt(window.localStorage.getItem("other_sumammount_not_nec"))]
							  ]);

					var view = new google.visualization.DataView(data);
						
					var options = {
								title: "Ανάλυση εξόδων",
								bar: {groupWidth: "80%"},
								legend: { position: "none" }
							   };
							   
					var chart = new google.visualization.ColumnChart(document.getElementById("columnchart"));
					chart.draw(view, options);
					}
						
				}					
function showedit()
				{
					var all_data = "";
					/*
					var arr_nec = ["Φαγητό/Ποτό: " + window.localStorage.getItem("food_sumammount_nec") + "€",
					"Supermarket: " + window.localStorage.getItem("super_sumammount_nec") + "€",
					"Αυτοκίνητο: " + window.localStorage.getItem("car_sumammount_nec") + "€",
					"Διασκέδαση: " + window.localStorage.getItem("ent_sumammount_nec") + "€",
					"Προσωπικά: " + window.localStorage.getItem("pers_sumammount_nec") + "€",
					"Διακοπές: " + window.localStorage.getItem("voc_sumammount_nec") + "€",
					"Άλλο: " + window.localStorage.getItem("other_sumammount_nec") + "€"];
					
					var arr_notnec = ["Φαγητό/Ποτό: " + window.localStorage.getItem("food_sumammount_not_nec") + "€",
					"Supermarket: " + window.localStorage.getItem("super_sumammount_not_nec") + "€",
					"Αυτοκίνητο: " + window.localStorage.getItem("car_sumammount_not_nec") + "€",
					"Διασκέδαση: " + window.localStorage.getItem("ent_sumammount_not_nec") + "€",
					"Προσωπικά: " + window.localStorage.getItem("pers_sumammount_not_nec") + "€",
					"Διακοπές: " + window.localStorage.getItem("voc_sumammount_not_nec") + "€",
					"Άλλο: " + window.localStorage.getItem("other_sumammount_not_nec") + "€"];
					
					
					//$("#edit").append("<ul></ul>");
					var nec_list;
					var notnec_list;
					
					var record;
					for(var i in arr_nec)
					{
					
						//var li = "<li>";
						//$("#dynamic_ul_nec").append(li.concat(arr_nec[i]))
						if(i>0)
						{
							nec_list = nec_list + "<li>"+arr_nec[i]+"</li>";
						}
						else
						{
							nec_list = "<li>"+arr_nec[i]+"</li>";
						}
					}
						
					document.getElementById("dynamic_ul_nec").innerHTML = nec_list;
										 
					for(var i in arr_notnec)
					{
						if(i>0)
						{
							notnec_list = notnec_list + "<li>"+arr_notnec[i]+"</li>";
						}
						else
						{
							notnec_list = "<li>"+arr_notnec[i]+"</li>";
						}
						//var li = "<li>";
						//$("#dynamic_ul_notnec").append(li.concat(arr_notnec[i]))
					}
					
					document.getElementById("dynamic_ul_notnec").innerHTML = notnec_list;
					*/
							
									for (var i=window.localStorage.getItem('lastid'); i>0 ; i--) {
										
										if(window.localStorage.getItem(i) != null)
										{
											if(i == window.localStorage.getItem('lastid') )
											{
												all_data = "<li onclick=\"delete_data(" + i + ")\">" + window.localStorage.getItem(i) + "<img src=\"assets/close.svg\"</li>";
												
											}
											else
											{
												all_data = all_data + "<li onclick=\"delete_data(" + i + ")\">" + window.localStorage.getItem(i) + "<img src=\"assets/close.svg\"</li>";
											}
									
											//console.log(window.localStorage.getItem('lastid'));
											//var li = "<li>";
											//$("#dynamic_ul_all_data").append(li.concat(window.localStorage.getItem(i)));
											record = JSON.parse(window.localStorage.getItem(i));
											//for (var prop in record) {
												//console.log('  ' + prop + ': ' + record[prop]);
											//}
											//console.log(window.localStorage.getItem(i));
											console.log(record.Category_selection);
										}
									}
									document.getElementById("dynamic_ul_all_data").innerHTML = all_data;
								
								
	
				}	
				
function delete_data(record_id)
				{	
				edit_counters(record_id, "remove");
				localStorage.removeItem(record_id);
				showedit();
				}
				
function edit_counters(record_id, symbol)
{
	var record = JSON.parse(window.localStorage.getItem(record_id));
	if(symbol == "add")
	{
			if(record.Necessary_selection)
								{
									if(record.Category_selection == "fd")
									{
										localStorage.setItem("food_sumammount_nec", parseInt(window.localStorage.getItem("food_sumammount_nec"))+parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "sm")
									{
										localStorage.setItem("super_sumammount_nec", parseInt(window.localStorage.getItem("super_sumammount_nec"))+parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "car")
									{
										localStorage.setItem("car_sumammount_nec", parseInt(window.localStorage.getItem("car_sumammount_nec"))+parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "fun")
									{
										localStorage.setItem("ent_sumammount_nec", parseInt(window.localStorage.getItem("ent_sumammount_nec"))+parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "per")
									{
										localStorage.setItem("pers_sumammount_nec", parseInt(window.localStorage.getItem("pers_sumammount_nec"))+parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "voc")
									{
										localStorage.setItem("voc_sumammount_nec", parseInt(window.localStorage.getItem("voc_sumammount_nec"))+parseInt(record.Ammount_selection));
									}
									else
									{
										localStorage.setItem("other_sumammount_nec", parseInt(window.localStorage.getItem("other_sumammount_nec"))+parseInt(record.Ammount_selection));
									}
								}
								else
								{
									if(record.Category_selection == "fd")
									{
										localStorage.setItem("food_sumammount_not_nec", parseInt(window.localStorage.getItem("food_sumammount_not_nec"))+parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "sm")
									{
										localStorage.setItem("super_sumammount_not_nec", parseInt(window.localStorage.getItem("super_sumammount_not_nec"))+parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "car")
									{
										localStorage.setItem("car_sumammount_not_nec", parseInt(window.localStorage.getItem("car_sumammount_not_nec"))+parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "fun")
									{
										localStorage.setItem("ent_sumammount_not_nec", parseInt(window.localStorage.getItem("ent_sumammount_not_nec"))+parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "per")
									{
										localStorage.setItem("pers_sumammount_not_nec", parseInt(window.localStorage.getItem("pers_sumammount_not_nec"))+parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "voc")
									{
										localStorage.setItem("voc_sumammount_not_nec", parseInt(window.localStorage.getItem("voc_sumammount_not_nec"))+parseInt(record.Ammount_selection));
									}
									else
									{
										localStorage.setItem("other_sumammount_not_nec", parseInt(window.localStorage.getItem("other_sumammount_not_nec"))+parseInt(record.Ammount_selection));
									}
								}
	}
	
	else
	{
		
				
								if(record.Necessary_selection)
								{
									if(record.Category_selection == "fd")
									{
										localStorage.setItem("food_sumammount_nec", parseInt(window.localStorage.getItem("food_sumammount_nec"))-parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "sm")
									{
										localStorage.setItem("super_sumammount_nec", parseInt(window.localStorage.getItem("super_sumammount_nec"))-parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "car")
									{
										localStorage.setItem("car_sumammount_nec", parseInt(window.localStorage.getItem("car_sumammount_nec"))-parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "fun")
									{
										localStorage.setItem("ent_sumammount_nec", parseInt(window.localStorage.getItem("ent_sumammount_nec"))-parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "per")
									{
										localStorage.setItem("pers_sumammount_nec", parseInt(window.localStorage.getItem("pers_sumammount_nec"))-parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "voc")
									{
										localStorage.setItem("voc_sumammount_nec", parseInt(window.localStorage.getItem("voc_sumammount_nec"))-parseInt(record.Ammount_selection));
									}
									else
									{
										localStorage.setItem("other_sumammount_nec", parseInt(window.localStorage.getItem("other_sumammount_nec"))-parseInt(record.Ammount_selection));
									}
								}
								else
								{
									if(record.Category_selection == "fd")
									{
										localStorage.setItem("food_sumammount_not_nec", parseInt(window.localStorage.getItem("food_sumammount_not_nec"))-parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "sm")
									{
										localStorage.setItem("super_sumammount_not_nec", parseInt(window.localStorage.getItem("super_sumammount_not_nec"))-parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "car")
									{
										localStorage.setItem("car_sumammount_not_nec", parseInt(window.localStorage.getItem("car_sumammount_not_nec"))-parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "fun")
									{
										localStorage.setItem("ent_sumammount_not_nec", parseInt(window.localStorage.getItem("ent_sumammount_not_nec"))-parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "per")
									{
										localStorage.setItem("pers_sumammount_not_nec", parseInt(window.localStorage.getItem("pers_sumammount_not_nec"))-parseInt(record.Ammount_selection));
									}
									else if(record.Category_selection == "voc")
									{
										localStorage.setItem("voc_sumammount_not_nec", parseInt(window.localStorage.getItem("voc_sumammount_not_nec"))-parseInt(record.Ammount_selection));
									}
									else
									{
										localStorage.setItem("other_sumammount_not_nec", parseInt(window.localStorage.getItem("other_sumammount_not_nec"))-parseInt(record.Ammount_selection));
									}
								}
	}
}