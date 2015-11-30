var general_data =[
  {"year":2010, "visa_type":"H-1B","CERTIFIED":258381,"CERTIFIED_WITHDRAWN":27397,"DENIED":38827,"WITHDRAWN":11420,"OTHERS":14},
  {"year":2010, "visa_type":"H-1B1 Chile","CERTIFIED":289,"CERTIFIED_WITHDRAWN":34,"DENIED":105,"WITHDRAWN":14,"OTHERS":1},
  {"year":2010, "visa_type":"H-1B1 Singapore","CERTIFIED":263,"CERTIFIED_WITHDRAWN":27,"DENIED":59,"WITHDRAWN":12,"OTHERS":0},
  {"year":2010, "visa_type":"E-3 Australian","CERTIFIED":3757,"CERTIFIED_WITHDRAWN":347,"DENIED":1460,"WITHDRAWN":184,"OTHERS":3},
  {"year":2010, "visa_type":"Not Specified","CERTIFIED":0,"CERTIFIED_WITHDRAWN":0,"DENIED":1,"WITHDRAWN":0,"OTHERS":5},
  {"year":2011, "visa_type":"H-1B","CERTIFIED":303099,"CERTIFIED_WITHDRAWN":11442,"DENIED":27711,"WITHDRAWN":9962,"OTHERS":0},
  {"year":2011, "visa_type":"H-1B1 Chile","CERTIFIED":294,"CERTIFIED_WITHDRAWN":7,"DENIED":91,"WITHDRAWN":6,"OTHERS":0},
  {"year":2011, "visa_type":"H-1B1 Singapore","CERTIFIED":233,"CERTIFIED_WITHDRAWN":7,"DENIED":39,"WITHDRAWN":9,"OTHERS":0},
  {"year":2011, "visa_type":"E-3 Australian","CERTIFIED":4310,"CERTIFIED_WITHDRAWN":140,"DENIED":1331,"WITHDRAWN":175,"OTHERS":0},
  {"year":2011, "visa_type":"Not Specified","CERTIFIED":0,"CERTIFIED_WITHDRAWN":0,"DENIED":1,"WITHDRAWN":0,"OTHERS":0},
  {"year":2012, "visa_type":"H-1B","CERTIFIED":346773,"CERTIFIED_WITHDRAWN":30674,"DENIED":19869,"WITHDRAWN":10708,"OTHERS":0},
  {"year":2012, "visa_type":"H-1B1 Chile","CERTIFIED":335,"CERTIFIED_WITHDRAWN":8,"DENIED":57,"WITHDRAWN":9,"OTHERS":0},
  {"year":2012, "visa_type":"H-1B1 Singapore","CERTIFIED":375,"CERTIFIED_WITHDRAWN":19,"DENIED":52,"WITHDRAWN":17,"OTHERS":0},
  {"year":2012, "visa_type":"E-3 Australian","CERTIFIED":5185,"CERTIFIED_WITHDRAWN":417,"DENIED":1171,"WITHDRAWN":175,"OTHERS":0},
  {"year":2012, "visa_type":"Not Specified","CERTIFIED":0,"CERTIFIED_WITHDRAWN":0,"DENIED":0,"WITHDRAWN":1,"OTHERS":0},
  {"year":2013, "visa_type":"H-1B","CERTIFIED":375925,"CERTIFIED_WITHDRAWN":34909,"DENIED":11250,"WITHDRAWN":11506,"OTHERS":14},
  {"year":2013, "visa_type":"H-1B1 Chile","CERTIFIED":384,"CERTIFIED_WITHDRAWN":12,"DENIED":37,"WITHDRAWN":9,"OTHERS":0},
  {"year":2013, "visa_type":"H-1B1 Singapore","CERTIFIED":460,"CERTIFIED_WITHDRAWN":24,"DENIED":24,"WITHDRAWN":12,"OTHERS":0},
  {"year":2013, "visa_type":"E-3 Australian","CERTIFIED":6182,"CERTIFIED_WITHDRAWN":487,"DENIED":858,"WITHDRAWN":179,"OTHERS":1},
  {"year":2013, "visa_type":"Not Specified","CERTIFIED":0,"CERTIFIED_WITHDRAWN":0,"DENIED":1,"WITHDRAWN":1,"OTHERS":0}, 
  {"year":2014, "visa_type":"H-1B","CERTIFIED":446416,"CERTIFIED_WITHDRAWN":35742,"DENIED":10790,"WITHDRAWN":15726,"OTHERS":2},
  {"year":2014, "visa_type":"H-1B1 Chile","CERTIFIED":479,"CERTIFIED_WITHDRAWN":21,"DENIED":49,"WITHDRAWN":8,"OTHERS":0},
  {"year":2014, "visa_type":"H-1B1 Singapore","CERTIFIED":714,"CERTIFIED_WITHDRAWN":35,"DENIED":50,"WITHDRAWN":26,"OTHERS":0},
  {"year":2014, "visa_type":"E-3 Australian","CERTIFIED":7535,"CERTIFIED_WITHDRAWN":552,"DENIED":1049,"WITHDRAWN":309,"OTHERS":1},
  {"year":2014, "visa_type":"Not Specified","CERTIFIED":0,"CERTIFIED_WITHDRAWN":0,"DENIED":0,"WITHDRAWN":0,"OTHERS":0}
];



var data = general_data.map(function(d) {
  d.all_visa = d.CERTIFIED + d.CERTIFIED_WITHDRAWN + d.DENIED + d.WITHDRAWN + d.OTHERS;
  return d;
});

// console.log(data);

var nested_data_year = d3.nest()
					.key(function(d) {return d.year;})
			       		.sortKeys(d3.ascending)
					.entries(data);



function filter(input){
  var pointer = input;
  d3.selectAll("svg").remove();
  return pointer;
}

function nestData(data){
  var nested_by_year = d3.nest()
          .key(function(d) {return d.year;})
          .sortKeys(d3.ascending)
          .rollup(function(visa_types) {
            var certified_sum = d3.sum(visa_types, function(one_type){return one_type.CERTIFIED;});
            var c_withdraw_sum = d3.sum(visa_types, function(one_type){return one_type.CERTIFIED_WITHDRAWN;});
            var denied_sum = d3.sum(visa_types, function(one_type){return one_type.DENIED;});
            var withdraw_sum = d3.sum(visa_types, function(one_type){return one_type.WITHDRAWN;});
            var other_sum = d3.sum(visa_types, function(one_type){return one_type.OTHERS;});
            var all_sum = d3.sum(visa_types, function(one_type){return one_type.all_visa;});
            return {
              certified: +certified_sum,
              certi_withdraw: +c_withdraw_sum,
              denied: +denied_sum,
              withdraw: +withdraw_sum,
              other:+other_sum,
              all: +all_sum
            };
          })
          .entries(data);

          return nested_by_year;
}


  function render(type) {
      document.getElementById("details").innerHTML ="";
      document.getElementById("c1").innerHTML ="";
      document.getElementById("c2").innerHTML ="";
      document.getElementById("c3").innerHTML ="";
      document.getElementById("c4").innerHTML ="";
      document.getElementById("c5").innerHTML ="";
      document.getElementById("c6").innerHTML ="";






      var pointer = filter(type);
      var filtered_data = data.filter(function(d) {
      if (pointer == "All") 
        return true;    
      else 
        return (d.visa_type == pointer);
    });

      var nested_by_year = nestData(filtered_data);

       

          // console.log(nested_by_year);



    var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 500 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

    var year = [2010,2011,2012,2013,2014];

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .5)
        .domain(year);

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0,d3.max(nested_by_year,function(d){return d.values.all;})]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);


    var tip = d3.tip()
          .attr("class","d3-tip")
          .offset([-10,0])
          .html(function(d) {
            // return +d.values.all;
            return "<strong>Year "+d.key+":</strong><br><p>Total case number: "+d.values.all+"</p><p>certified number: " +
                    d.values.certified+"</p><p>certified_withdraw number: "+d.values.certi_withdraw +
                    "</p><p>denied number: "+d.values.denied+"</p><p>withdraw number: "+d.values.withdraw +
                    "</p><p>other number: "+d.values.other;
          });

    var svg = d3.select("#chart")
          .append("svg")
          .attr("width",width + margin.left + margin.right)
          .attr("height",height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    svg.call(tip);

      

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("text")
        .attr("class","axis-label")
        .attr("y", height+15)
        .attr("x", width)
        .text("year");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
            .attr("transform","rotate(-90)")
            .attr("y", 6)
            .attr("dy",".71em")
            .style("text-anchor","end")
            .text("Case Number");




      //draw certified bar
      var certified_bar = svg.selectAll(".certified").data(nested_by_year,function(d) {return d.key;});
      certified_bar.enter().append("rect")
                  .attr("class","certified")
                  .attr("x",function(d){return x(d.key);})
                  .attr("y",height)
                  .attr("height",0)
                  .attr("year",function(d){return d.key;})
                  .attr("width",x.rangeBand());
      certified_bar.transition().delay(100).duration(900)
      .attr("y",function(d){return y(d.values.certified);})
      .attr("height",function(d){return height - y(d.values.certified);});

      
      // .on("mouseover",tip.show)
      // .on("mouseout",tip.hide)
      certified_bar
      .on("mouseover",writedetails)
      .on("click", function(d){changeData(d.key);});

      function writedetails(d){
          document.getElementById("details").innerHTML =  "<ul><li id=\"y1\"><strong>Year "+d.key+":</strong></li><li><strong>Total case number: </strong>"
                    +d.values.all+
                    "</li></ul><table id=\"result_table\"><tr><td><strong>Certified: </strong>"+d.values.certified+
                    "</td><td><strong>&nbsp&nbsp&nbsp&nbspPercentage: </strong>"+Math.round((d.values.certified/d.values.all)*100)+"%</td></tr><tr><td><strong>C_withdrawn: </strong>"+d.values.certi_withdraw +
                    "</td><td><strong>&nbsp&nbsp&nbsp&nbspPercentage: </strong>"+Math.round((d.values.certi_withdraw/d.values.all)*100)+"%</td></tr><tr><td><strong>Denied: </strong>"+d.values.denied+
                    "</td><td><strong>&nbsp&nbsp&nbsp&nbspPercentage: </strong>"+Math.round((d.values.denied/d.values.all)*100)+"%</td></tr><tr><td><strong>Withdrawn: </strong>"+d.values.withdraw +
                    "</td><td><strong>&nbsp&nbsp&nbsp&nbspPercentage: </strong>"+Math.round((d.values.withdraw/d.values.all)*100)+"%</td></tr><tr><td><strong>Other: </strong>"+d.values.other +
                    "</td><td><strong>&nbsp&nbsp&nbsp&nbspPercentage: </strong>"+Math.round((d.values.other/d.values.all)*100)+"%</td></tr></table>";
      }

      function changeData(input_year){
        
            var all_sum = nestData(data);
            var all_sum_year = all_sum.filter(function(d){return d.key == input_year;});
            var data_year = filtered_data.filter(function(d){return d.year == input_year;});
            // console.log(data_year);
            // document.getElementById("certified").innerHTML = "aaa";
            //total number
          if (pointer != "All"){
            var rounded_total_percentage = Math.round((data_year[0].all_visa/all_sum_year[0].values.all)*10000)/100;
            document.getElementById("n1").innerHTML = "Among: "+all_sum_year[0].values.all;
            document.getElementById("c1").innerHTML = rounded_total_percentage +"%";
            //certified
            var rounded_certi_percentage = Math.round((data_year[0].CERTIFIED/all_sum_year[0].values.certified)*10000)/100;
            document.getElementById("n2").innerHTML = "Among: "+all_sum_year[0].values.certified;
            document.getElementById("c2").innerHTML = rounded_certi_percentage +"%";
            //certi_widraw
            var rounded_c_wd_percentage = Math.round((data_year[0].CERTIFIED_WITHDRAWN/all_sum_year[0].values.certi_withdraw)*10000)/100;
            document.getElementById("n3").innerHTML = "Among: "+all_sum_year[0].values.certi_withdraw;
            document.getElementById("c3").innerHTML = rounded_c_wd_percentage +"%";
            //denied
            var rounded_denied_percentage = Math.round((data_year[0].DENIED/all_sum_year[0].values.denied)*10000)/100;
            document.getElementById("n4").innerHTML = "Among: "+all_sum_year[0].values.denied;
            document.getElementById("c4").innerHTML = rounded_denied_percentage +"%";
            //withdraw
            var rounded_wd_percentage = Math.round((data_year[0].WITHDRAWN/all_sum_year[0].values.withdraw)*10000)/100;
            document.getElementById("n5").innerHTML = "Among: "+all_sum_year[0].values.withdraw;
            document.getElementById("c5").innerHTML = +rounded_wd_percentage +"%";
            //other
            var rounded_other_percentage = Math.round((data_year[0].OTHERS/all_sum_year[0].values.other)*10000)/100;
            document.getElementById("n6").innerHTML = "Among: "+all_sum_year[0].values.other;
            document.getElementById("c6").innerHTML = +rounded_other_percentage +"%";
        }
        else{
            document.getElementById("n1").innerHTML = "Among: "+all_sum_year[0].values.all;
            document.getElementById("c1").innerHTML = "100%";
            document.getElementById("n2").innerHTML = "Among: "+all_sum_year[0].values.certified;
            document.getElementById("c2").innerHTML = "100%";
            document.getElementById("n3").innerHTML = "Among: "+all_sum_year[0].values.certi_withdraw;
            document.getElementById("c3").innerHTML = "100%";
            document.getElementById("n4").innerHTML = "Among: "+all_sum_year[0].values.denied;
            document.getElementById("c4").innerHTML = "100%";
            document.getElementById("n5").innerHTML = "Among: "+all_sum_year[0].values.withdraw;
            document.getElementById("c5").innerHTML = "100%";
            document.getElementById("n6").innerHTML = "Among: "+all_sum_year[0].values.other;
            document.getElementById("c6").innerHTML = "100%";

        }
      }

      


      //draw certified_withdraw
      var certified_wd_bar = svg.selectAll(".certified_wd").data(nested_by_year,function(d) {return d.key;});
      certified_wd_bar.enter().append("rect")
                  .attr("class","certified_wd")
                  .attr("x",function(d){return x(d.key);})
                  .attr("y",function(d){return y(d.values.certified);})
                  .attr("height",0)
                  .attr("year",function(d){return d.key;})
                  .attr("width",x.rangeBand());
      certified_wd_bar.transition().delay(1000).duration(900)
      .attr("y",function(d){return y(d.values.certified+d.values.certi_withdraw);})
      .attr("height",function(d){return height - y(d.values.certi_withdraw);});

      certified_wd_bar
      .on("mouseover",writedetails)
      .on("click", function(d){changeData(d.key);});

      //draw denied
      var denied_bar = svg.selectAll(".denied").data(nested_by_year,function(d) {return d.key;});
      denied_bar.enter().append("rect")
                  .attr("class","denied")
                  .attr("x",function(d){return x(d.key);})
                  .attr("y",function(d){return y(d.values.certified + d.values.certi_withdraw);})
                  .attr("height",0)
                  .attr("year",function(d){return d.key;})
                  .attr("width",x.rangeBand());
      denied_bar.transition().delay(1900).duration(900)
      .attr("y",function(d){return y(d.values.certified + d.values.certi_withdraw + d.values.denied);})
      .attr("height",function(d){return height - y(d.values.denied);});

      denied_bar
      .on("mouseover",writedetails)
      .on("click", function(d){changeData(d.key);});

      //draw withdraw
      var withdraw_bar = svg.selectAll(".withdraw").data(nested_by_year,function(d) {return d.key;});
      withdraw_bar.enter().append("rect")
                  .attr("class","withdraw")
                  .attr("x",function(d){return x(d.key);})
                  .attr("y",function(d){return y(d.values.certified + d.values.certi_withdraw + d.values.denied);})
                  .attr("height",0)
                  .attr("year",function(d){return d.key;})
                  .attr("width",x.rangeBand());
      withdraw_bar.transition().delay(2800).duration(900)
      .attr("y",function(d){return y(d.values.certified + d.values.certi_withdraw + d.values.denied + d.values.withdraw);})
      .attr("height",function(d){return height - y(d.values.withdraw);});

      withdraw_bar
      .on("mouseover",writedetails)
      .on("click", function(d){changeData(d.key);});

      //draw others
      var other_bar = svg.selectAll(".other").data(nested_by_year,function(d) {return d.key;});
      other_bar.enter().append("rect")
                  .attr("class","other")
                  .attr("x",function(d){return x(d.key);})
                  .attr("y",function(d){return y(d.values.certified + d.values.certi_withdraw + d.values.denied + d.values.withdraw);})
                  .attr("height",0)
                  .attr("year",function(d){return d.key;})
                  .attr("width",x.rangeBand());
      other_bar.transition().delay(2800).duration(900)
      .attr("y",function(d){return y(d.values.all);})
      .attr("height",function(d){return height - y(d.values.other);});

      other_bar
      .on("mouseover",writedetails)
      .on("click", function(d){changeData(d.key);});




  }


render("All");






