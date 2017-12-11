Array.prototype.extend = function (other_array) {
  other_array.forEach(function(v) {this.push(v)}, this);    
}
Array.prototype.multiSplice = function (startIndex,numToRemove,other_array) {
  this.splice(startIndex,numToRemove);
  for(var i=other_array.length-1; i>=0; i--) {
    this.splice(startIndex,0,other_array[i]);
  }   
}
Array.prototype.moveElement = function (from,to,count) {
  if(typeof count=="undefined" || count<1) {
    this.splice(to,0,this.splice(from,1)[0]);
    return this[to];
  }
  else {
    var temp=this.splice(from,count);
    this.multiSplice(to,0,temp);
    return temp;
  }
}

function cipherShort(txt,key) {
  var valAll=[[" "," "," "," "],[" "," "," "," "]];
  var center;
  var turnDirection;
  var squarePattern;
  squarePattern=parseInt(Math.random()*8+1);
  var converting=sepStrIntoChunks(key,3);
  var convertingTwo=(" abcdefghijklmnopqrstuvwxyz0123456789()[]{}+-=\".,;<>\n:/\\!%*|'?_^~`@#$&¡™£¢∞§¶•ªº–≠`€‹›ﬁﬂ‡°·‚—±œ∑®†¥øπ“‘«åß∂ƒ©˙∆˚¬…æΩ≈ç√∫µ≤≥÷Œ„´‰ˇÁ¨ˆØ∏”’ÅÍÎÏ˝ÓÔÒÚÆ¸˛Ç◊ı˜Â¯˘¿áéíóúäëïöüâêîôûñÉÄËÖÜÊÛÑABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
  inputLetters=txt.split("");
  /*for(var i=0; i<4; i++) {
    valAll[0][i]=inputLetters.split("")[i];
    valAll[0][i]=parseInt(converting[convertingTwo.split("").indexOf(valAll[0][i])]);
    valAll[1][i]=parseInt(Math.random()*10);
    valAll[0][i]+=valAll[1][i];
    valAll[1][i]=converting[valAll[1][i]+27];
    if(valAll[0][i]<100) {
      valAll[0][i]=String(valAll[0][i]);
    }
    else if(valAll[0][i]==100) {
      valAll[0][i]="00";
    }
    else if(valAll[0][i]>100) {
      valAll[0][i]-=100;
      valAll[0][i]=String(valAll[0][i]);
      valAll[0][i]="0"+valAll[0][i];
    }
    valAll[1][i]=String(valAll[1][i]);
  }*/
  for(var i=0; i<4; i++) {
    valAll[1][i]=parseInt(Math.random()*10);
    valAll[0][i]=parseInt(converting[convertingTwo.indexOf(inputLetters[i])])+valAll[1][i];
    valAll[1][i]=parseInt(converting[convertingTwo.indexOf(""+valAll[1][i])]);
    for(var j=0; j<2; j++) {
      if(valAll[j][i]>=1000) {
        valAll[j][i]-=1000;
      }
      if(valAll[j][i]<=0) {
        valAll[j][i]="000";
      }
      else if(valAll[j][i]<10) {
        valAll[j][i]="00"+valAll[j][i];
      }
      else if(valAll[j][i]<100) {
        valAll[j][i]="0"+valAll[j][i];
      }
      else {
        valAll[j][i]=""+valAll[j][i];
      }
    }
  }
  var header="";
  if(Math.random()<0.333) {
    header=parseInt(Math.random()*(10-squarePattern)+squarePattern)+""+parseInt(Math.random()*(10-squarePattern)+squarePattern)+""+squarePattern;
  }
  else if(Math.random()>0.5) {
    header=parseInt(Math.random()*(10-squarePattern)+squarePattern)+""+squarePattern+""+parseInt(Math.random()*(10-squarePattern)+squarePattern);
  }
  else {
    header=squarePattern+""+parseInt(Math.random()*(10-squarePattern)+squarePattern)+""+parseInt(Math.random()*(10-squarePattern)+squarePattern);
  }
  switch(squarePattern) {
    case 1:
      txtdisplay=header+valAll[1][1]+valAll[0][0]+valAll[0][3]+valAll[0][2]+valAll[1][2]+valAll[1][3]+valAll[1][0]+valAll[0][1];
      break;
    case 2:
      txtdisplay=header+valAll[0][3]+valAll[0][0]+valAll[1][1]+valAll[1][2]+valAll[0][2]+valAll[0][1]+valAll[1][0]+valAll[1][3];
      break;
    case 3:
      txtdisplay=header+valAll[0][3]+valAll[1][2]+valAll[0][1]+valAll[0][0]+valAll[1][0]+valAll[1][1]+valAll[0][2]+valAll[1][3];
      break;
    case 4:
      txtdisplay=header+valAll[1][1]+valAll[0][2]+valAll[1][3]+valAll[0][0]+valAll[1][0]+valAll[0][3]+valAll[1][2]+valAll[0][1];
      break;
    case 5:
      txtdisplay=header+valAll[0][1]+valAll[1][0]+valAll[1][3]+valAll[1][2]+valAll[0][2]+valAll[0][3]+valAll[0][0]+valAll[1][1];
      break;
    case 6:
      txtdisplay=header+valAll[1][3]+valAll[1][0]+valAll[0][1]+valAll[0][2]+valAll[1][2]+valAll[0][3]+valAll[0][0]+valAll[1][1];
      break;
    case 7:
      txtdisplay=header+valAll[1][3]+valAll[0][2]+valAll[1][1]+valAll[1][0]+valAll[0][0]+valAll[0][1]+valAll[1][2]+valAll[0][3];
      break;
    case 8:
      txtdisplay=header+valAll[0][1]+valAll[1][2]+valAll[0][3]+valAll[1][0]+valAll[0][0]+valAll[1][3]+valAll[0][2]+valAll[1][1];
      break;
  }
  return txtdisplay;
}
function decipherShort(txt,key) {
  var converting=sepStrIntoChunks(key,3);
  var convertingTwo=(" abcdefghijklmnopqrstuvwxyz0123456789()[]{}+-=\".,;<>\n:/\\!%*|'?_^~`@#$&¡™£¢∞§¶•ªº–≠`€‹›ﬁﬂ‡°·‚—±œ∑®†¥øπ“‘«åß∂ƒ©˙∆˚¬…æΩ≈ç√∫µ≤≥÷Œ„´‰ˇÁ¨ˆØ∏”’ÅÍÎÏ˝ÓÔÒÚÆ¸˛Ç◊ı˜Â¯˘¿áéíóúäëïöüâêîôûñÉÄËÖÜÊÛÑABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
  var valAll=[[" "," "," "," "],[" "," "," "," "]];
  var foo=sepStrIntoChunks(txt,3);
  var squarePattern=Math.min(Math.min(parseInt(foo[0].split("")[0]),parseInt(foo[0].split("")[1])),parseInt(foo[0].split("")[2]));
  switch(squarePattern) {
    case 1:
      valAll=[[foo[2],foo[8],foo[4],foo[3]],[foo[7],foo[1],foo[5],foo[6]]];
      break;
    case 2:
      valAll=[[foo[2],foo[6],foo[5],foo[1]],[foo[7],foo[3],foo[4],foo[8]]];
      break;
    case 3:
      valAll=[[foo[4],foo[3],foo[7],foo[1]],[foo[5],foo[6],foo[2],foo[8]]];
      break;
    case 4:
      valAll=[[foo[4],foo[8],foo[2],foo[6]],[foo[5],foo[1],foo[7],foo[3]]];
      break;
    case 5:
      valAll=[[foo[7],foo[1],foo[5],foo[6]],[foo[2],foo[8],foo[4],foo[3]]];
      break;
    case 6:
      valAll=[[foo[7],foo[3],foo[4],foo[6]],[foo[2],foo[8],foo[5],foo[1]]];
      break;
    case 7:
      valAll=[[foo[5],foo[6],foo[2],foo[8]],[foo[4],foo[3],foo[7],foo[1]]];
      break;
    case 8:
      valAll=[[foo[5],foo[1],foo[7],foo[3]],[foo[4],foo[8],foo[2],foo[6]]];
      break;
  }
  /*console.log(JSON.stringify(valAll));
  for(var i=0; i<4; i++) {
    valAll[1][i]=parseInt(convertingTwo.split("")[converting.indexOf(valAll[1][i]+"")]);
  }
  console.log(JSON.stringify(valAll));
  var total="";
  for(var i=0; i<4; i++) {
    valAll[0][i]=convertingTwo.split("")[converting.indexOf(valAll[0][i]+"")-valAll[1][i]];
    total+=valAll[0][i];
  }*/
  var total="";
  for(var i=0; i<4; i++) {
    valAll[1][i]=parseInt(convertingTwo[converting.indexOf(valAll[1][i])]);
    var temp=parseInt(valAll[0][i])-valAll[1][i];
    if(temp<=0) {
      temp+=100;
    }
    valAll[0][i]=convertingTwo[converting.indexOf(temp+"")];
    total+=valAll[0][i];
  }
  return total;
}
function cipher(txt,key) {
  var temp=sepStrIntoChunks(txt,4);
  var total="";
  for(var i=0; i<temp.length; i++) {
    total+=cipherShort(temp[i],key);
  }
  return total;
}
function decipher(txt,key) {
  var temp=sepStrIntoChunks(txt,27);
  var total="";
  for(var i=0; i<temp.length; i++) {
    total+=decipherShort(temp[i],key);
  }
  return removeExcess(total);
}
function sepStrIntoChunks(str,size) {
  var temp=str;
  while(temp.length%size!=0) {
    temp+=" ";
  }
  temp=temp.split("");
  var total=[];
  for(var i=0; i<temp.length/size; i++) {
    total.push("");
  }
  for(var i=0; i<temp.length; i++) {
    total[parseInt(i/size)]+=temp[i];
  }
  return total;
}
function genNumList(length) {var total=[]; for(var i=1; i<=length; i++) {total.push(i);} return total}
function genRandList(baseList) {var temp=JSON.parse(JSON.stringify(baseList)); total=[]; for(var i=1; i<=baseList.length; i++) {total.push(temp.splice(Math.floor(Math.random()*temp.length),1)[0])} return total}
function genKey() {var temp=genRandList(genNumList(889)); var total=""; for(var i=0; i<207; i++) {total+=(temp[i]+100)} return total;}


function genEqualSharing(size) {
  total="0";
  for(var i=0; i<size; i++) {
    total=addToEqualSharing(total);
  }
  return total;
}
function addToEqualSharing(start) {
  var temp=start.split("");
  var total="";
  for(var i=0; i<temp.length; i++) {
    if(temp[i]=="1") {
      total+="0";
    }
    else {
      total+="1";
    }
  }
  return start+total;
}
function thueShuffle(array) {
  var count=Math.ceil(Math.log2(array.length));
  var series=genEqualSharing(count).split("");
  for(var e=0; e<count; e++) {
    for(var i=0; i<array.length; i+=Math.pow(2,e+1)) {
      if(series[parseInt(i/Math.pow(2,e+1))-1]=="1") {
        array.moveElement(i-1,i-Math.pow(2,e)-1,Math.pow(2,e));
      }
    }
  }
  array.moveElement(3/4*Math.pow(2,Math.ceil(Math.log2(array.length))),1/2*Math.pow(2,Math.ceil(Math.log2(array.length))),Math.pow(2,Math.ceil(Math.log2(array.length)))/4);
}
function thueKey() {
  var total=[];
  for(var i=0; i<256; i++) {
    var temp=i+100;
    total.push(temp);
  }
  thueShuffle(total);
  total.length=207;
  var Total="";
  for(var i=0; i<total.length; i++) {
    Total+=total[i];
  }
  return Total;
}
function testForDup(array,Alert) {var total=[]; for(var i=0; i<64; i++) {if(array.indexOf(array[i])!=i) {if(Alert) {alert("duplicate of "+array[i]+" found at "+i+" and "+array.indexOf(array[i])+".")} total.push([array[i],i,array.indexOf(array[i])])}} return total}
function testIfIsInList(first,second) {/*is first in second*/ var temp=[]; for(var i=0; i<first.length; i++) {if(second.indexOf(first[i])==-1) {temp.push(false)} else temp.push(true)} return temp}
function noteCapitals(str) {
  var temp1=str;
  var temp2=str.toLowerCase();
  var total="";
  for(var i=0; i<temp1.length; i++) {
    if(temp1[i]!=temp2[i]) {
      total+="";
        }
    total+=temp2[i];
    }
  return total;
}
function denoteCapitals(str) {
  var total="";
  var capital=false;
  for(var i=0; i<str.length; i++) {
    if(str[i]=="") {
      capital=true;
        }
    else if(capital) {
      total+=str[i].toUpperCase();
      capital=false;
        }
    else {
      total+=str[i];
        }
    }
  return total;
}
function removeExcess(str) {
  var length=str.length;
  while(str[length-1]==" ") {
    length--;
    }
  return str.substring(0, length);
}
