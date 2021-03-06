//function to hide an element
function hide(element){
	
					document.getElementById(element).style.display = "none";
}

//function to show an element
function show(element){
	
					document.getElementById(element).style.display = "block";
}

//function to show specific content
function show_content(selection)
				{
					
					set_counters();
					hide("message_box");
					if(selection=="new")
					{
						document.getElementById("nav_new").classList.add('selected');
						document.getElementById("nav_stats").classList.remove('selected');
						document.getElementById("nav_edit").classList.remove('selected');
						show("new");
						hide("stats");
						hide("edit");	
					}
					else if (selection=="stats")
					{
						document.getElementById("nav_stats").classList.add('selected');
						document.getElementById("nav_new").classList.remove('selected');
						document.getElementById("nav_edit").classList.remove('selected');
						hide("new");
						show("stats");
						hide("edit");
						datastats();
					}
					else
					{
						document.getElementById("nav_edit").classList.add('selected');
						document.getElementById("nav_new").classList.remove('selected');
						document.getElementById("nav_stats").classList.remove('selected');
						hide("new");
						hide("stats");
						show("edit");
						dataedit();
					}
					
				}

//function to set all counters to 0 for first time				
function set_counters()
				{
						
					if (window.localStorage.getItem('lastid')== null){
						localStorage.setItem('lastid',1);
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

//function to save user's data
function insertdata()
				{
			
							var id = window.localStorage.getItem('lastid');
							
							var spendammount = document.forms['clientForm'].sammount.value;
							var category = document.forms['clientForm'].categ.value;
							var necessary = document.forms['clientForm'].nec.checked;
							var new_record = {'Category_selection': category, 'Ammount_selection': spendammount, 'Necessary_selection': necessary };
							
							
							if(spendammount != "")
							{
								if ((typeof(Storage) !== "undefined")) 
								{
										for (var prop in new_record) {
											console.log('  ' + prop + ': ' + new_record[prop]);
									}
									localStorage.setItem(id, JSON.stringify(new_record));	
									edit_counters(id, "add");									
									id++;
									localStorage.setItem('lastid',id);
								}
								
							}
							
							clear_form();
				}
				
//function to clear form's data
function clear_form()
				{
					
					document.getElementById("clientForm").reset();
				}				

//function to clear all local storage data			
function clear_all()
				{
					localStorage.clear();
					show_content("new");
					
					
				}				

//function to show all user's entries in a column chart
function datastats()
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

							    colors: ['#34675C', '#8FBC8F'],
								backgroundColor: '#E6FFF2',
								bar: {groupWidth: "80%"},
								legend: { position: "top" },
								vAxis: { viewWindow:{  min:0}}

							   };
							   
					var chart = new google.visualization.ColumnChart(document.getElementById("columnchart"));
					chart.draw(view, options);
					}
						
				}		

//function to show all user's entries and let the user delete them				
function dataedit()
				{
					
					var all_data="";
					var record;
					var li_class;
					
					hide("message_box");
					
									for (var i=window.localStorage.getItem('lastid'); i>0 ; i--) {
										
										record = JSON.parse(window.localStorage.getItem(i));
										
										if(window.localStorage.getItem(i) != null)
										{
											if(record.Necessary_selection)
											{
												li_class = "necessary_data_li";
											}
											else
											{
												li_class = "unnecessary_data_li";
											}	
											if(i == window.localStorage.getItem('lastid') )
											{
												all_data = "<li class=\"li_class\" " + li_class + "\" onclick=\"delete_data(" + i + ")>" + record.Category_selection + " έξοδα: " + record.Ammount_selection + "€" + "<img src=\"assets/close.svg\"</li>";
												
											}
											else
											{
												all_data = all_data + "<li class=\" " + li_class + "\" onclick=\"delete_data(" + i + ")\">" + record.Category_selection + " έξοδα: " + record.Ammount_selection + "€" + "<img src=\"assets/close.svg\"</li>";
											}
											
										}
									}
									document.getElementById("dynamic_ul_all_data").innerHTML = all_data;
								
								
	
				}	

//function to remove specific user's record from local storage after confirmation			
function delete_data(record_id)
{
					var record = JSON.parse(window.localStorage.getItem(record_id));
					show("message_box");
					hide("edit");
					document.getElementById("delete_record").innerHTML = record.Category_selection + " έξοδα: " + record.Ammount_selection + "€";
					
					document.getElementById("delete_yes").onclick = function(){
										
										
										edit_counters(record_id, "remove");
										localStorage.removeItem(record_id);
										dataedit();
										show("edit");
										
									};
					document.getElementById("delete_no").onclick = function(){ 
										
										show("edit");
										dataedit();
									
									};
									
									
}

//function to renew counters after a deletion or an insertion				
function edit_counters(record_id, symbol)
{
					var record = JSON.parse(window.localStorage.getItem(record_id));
					if(symbol == "add")
					{
										if(record.Necessary_selection)
										{
												if(record.Category_selection == "Φαγητό/Ποτό")
												{
													localStorage.setItem("food_sumammount_nec", parseInt(window.localStorage.getItem("food_sumammount_nec"))+parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Supermarket")
												{
													localStorage.setItem("super_sumammount_nec", parseInt(window.localStorage.getItem("super_sumammount_nec"))+parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Αυτοκίνητο")
												{
													localStorage.setItem("car_sumammount_nec", parseInt(window.localStorage.getItem("car_sumammount_nec"))+parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Διασκέδαση")
												{
													localStorage.setItem("ent_sumammount_nec", parseInt(window.localStorage.getItem("ent_sumammount_nec"))+parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Προσωπικά")
												{
													localStorage.setItem("pers_sumammount_nec", parseInt(window.localStorage.getItem("pers_sumammount_nec"))+parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Διακοπές")
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
												if(record.Category_selection == "Φαγητό/Ποτό")
												{
													localStorage.setItem("food_sumammount_not_nec", parseInt(window.localStorage.getItem("food_sumammount_not_nec"))+parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Supermarket")
												{
													localStorage.setItem("super_sumammount_not_nec", parseInt(window.localStorage.getItem("super_sumammount_not_nec"))+parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Αυτοκίνητο")
												{
													localStorage.setItem("car_sumammount_not_nec", parseInt(window.localStorage.getItem("car_sumammount_not_nec"))+parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Διασκέδαση")
												{
													localStorage.setItem("ent_sumammount_not_nec", parseInt(window.localStorage.getItem("ent_sumammount_not_nec"))+parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Προσωπικά")
												{
													localStorage.setItem("pers_sumammount_not_nec", parseInt(window.localStorage.getItem("pers_sumammount_not_nec"))+parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Διακοπές")
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
												if(record.Category_selection == "Φαγητό/Ποτό")
												{
													localStorage.setItem("food_sumammount_nec", parseInt(window.localStorage.getItem("food_sumammount_nec"))-parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Supermarket")
												{
													localStorage.setItem("super_sumammount_nec", parseInt(window.localStorage.getItem("super_sumammount_nec"))-parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Αυτοκίνητο")
												{
													localStorage.setItem("car_sumammount_nec", parseInt(window.localStorage.getItem("car_sumammount_nec"))-parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Διασκέδαση")
												{
													localStorage.setItem("ent_sumammount_nec", parseInt(window.localStorage.getItem("ent_sumammount_nec"))-parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Προσωπικά")
												{
													localStorage.setItem("pers_sumammount_nec", parseInt(window.localStorage.getItem("pers_sumammount_nec"))-parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Διακοπές")
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
												if(record.Category_selection == "Φαγητό/Ποτό")
												{
													localStorage.setItem("food_sumammount_not_nec", parseInt(window.localStorage.getItem("food_sumammount_not_nec"))-parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Supermarket")
												{
													localStorage.setItem("super_sumammount_not_nec", parseInt(window.localStorage.getItem("super_sumammount_not_nec"))-parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Αυτοκίνητο")
												{
													localStorage.setItem("car_sumammount_not_nec", parseInt(window.localStorage.getItem("car_sumammount_not_nec"))-parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Διασκέδαση")
												{
													localStorage.setItem("ent_sumammount_not_nec", parseInt(window.localStorage.getItem("ent_sumammount_not_nec"))-parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Προσωπικά")
												{
													localStorage.setItem("pers_sumammount_not_nec", parseInt(window.localStorage.getItem("pers_sumammount_not_nec"))-parseInt(record.Ammount_selection));
												}
												else if(record.Category_selection == "Διακοπές")
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
