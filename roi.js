(function(){
  var root=document.getElementById("roi-calc");
  if(!root)return;
  var pilot=+root.getAttribute("data-pilot");
  var OPTS=[
    {name:"Missed-Call Rescue Pilot (30 days)",setup:pilot,mo:0},
    {name:"Missed-Call Rescue",setup:497,mo:147},
    {name:"Lead Engine",setup:997,mo:297},
    {name:"AI Front Desk",setup:2497,mo:497}
  ];
  var $=function(i){return document.getElementById(i)};
  var usd=function(n){return "$"+Math.round(n).toLocaleString("en-US")};
  var one=function(n){return (Math.round(n*10)/10).toLocaleString("en-US")};
  function render(){
    var c=$("roi-calls").value,r=$("roi-close").value,j=$("roi-job").value;
    var ok=c!==""&&r!==""&&j!==""&&+c>=0&&+r>=0&&+r<=100&&+j>=0;
    if(!ok){$("roi-out").innerHTML='<p class="muted">Fill in all three boxes to see your number. Close rate is 0 to 100.</p>';return}
    var wk=(+c)*(+r/100)*(+j),mo=wk*52/12,yr=wk*52;
    var h='<p class="muted">Revenue at stake from missed calls</p>'+
      '<div class="roi-big">'+usd(mo)+'<span>/month</span></div>'+
      '<p class="muted">'+usd(wk)+' a week, '+usd(yr)+' a year</p>'+
      '<table class="roi-table"><tr><th>Option</th><th>Price</th><th>Won-back jobs to pay for it</th></tr>';
    OPTS.forEach(function(o){
      var price=o.mo?usd(o.setup)+' setup + '+usd(o.mo)+'/mo':usd(o.setup)+' one-time';
      var jobs=+j>0?(o.mo?one(o.setup/+j)+' for setup, '+one(o.mo/+j)+' a month':one(o.setup/+j)):'n/a';
      h+='<tr><td>'+o.name+'</td><td>'+price+'</td><td>'+jobs+'</td></tr>';
    });
    h+='</table>';
    $("roi-out").innerHTML=h;
  }
  var q=new URLSearchParams(location.search);
  [["roi-calls","calls"],["roi-close","close"],["roi-job","job"]].forEach(function(a){
    if(q.get(a[1])!==null&&q.get(a[1])!=="")$(a[0]).value=q.get(a[1]);
    $(a[0]).addEventListener("input",render)});
  render();
})();
