import React,{ useState } from 'react' // ตัวนี้เป็นฟังชั่น component

const Cholesky_Decomposition = () => {
  const [CheckUnValid,setCheckUnValid] = useState (false)
  const [ans,setans] = useState ([])
  const [MatA,setMatA] = useState ([])
  const [MatB,setMatB] = useState ([])
  let A = []; //[[]]
  let B = [];
  let size;

  /*---------------------------------------get value------------------------------------------*/
  const getVal = (e) => {
    A.splice(0,A.length)  //delete all value in array
    B.splice(0,B.length)  //delete all value in array
    for(let i=0;i<size;i++)
    {
      A.push([])
      B.push([])
      for(let j=0;j<size;j++)
      {
        A[i].push(document.getElementById('mat'+i+j).value); 
      }
     B[i].push(document.getElementById('matans'+i+"0").value);
    }
    //console.log(A,B);
    e.preventDefault()
    // let a = e.target.A
    // let b = e.target.B
    if(A && B)
    {
      setCheckUnValid(false);
      Cramer_Rule_solve(A, B);
    }
    else
    {
      setCheckUnValid(true);
    }
  }

  /*---------------------------------------get size of matrix------------------------------------------*/
  const InputChange = (e) => {
    e.preventDefault()
    size = e.target.value;
    let inputstr = '';
    for(let i=0;i<size;i++)
    {
      for(let j=0;j<size;j++)
      {
        inputstr+='<input type="number" id="mat'+i+j+'" style="width:50px"></input>';
      }
      inputstr+=' | <input type="number" id="matans'+i+'0" style="width:50px"></input>';
      inputstr+='<br>';
    }
    document.getElementById("showMatrix").innerHTML = inputstr;
    console.log(inputstr);
  }

  /*---------------------------------------Clone------------------------------------------*/
  const clone = (m) => {
    return m.map(function(a){return a.slice();});
  }

  /*---------------------------------------insert In Terms------------------------------------------*/
  const insertInTerms = (matrix, ins, at) => {
    var tmpMatrix = clone(matrix), i;
    for(i=0; i < matrix.length; i++) {
      tmpMatrix[i][at] = ins[i];
    }
    return tmpMatrix;
  }

  /*---------------------------------------find determinant------------------------------------------*/
  const detr = (m) => {
    var ret = 1, k, A=clone(m), n=m[0].length, alpha, i, temp, Aj, Ai, k1;
  
    for(var j =0; j < n-1; j++) {
      k=j;
      for(i=j+1;i<n;i++) { if(Math.abs(A[i][j]) > Math.abs(A[k][j])) { k = i; } }
      if(k !== j) {
          temp = A[k]; A[k] = A[j]; A[j] = temp;
          ret *= -1;
      }
      Aj = A[j];
      for(i=j+1;i<n;i++) {
        Ai = A[i];
              alpha = Ai[j]/Aj[j];
              for(k=j+1;k<n-1;k+=2) {
                  k1 = k+1;
                  Ai[k] -= Aj[k]*alpha;
                  Ai[k1] -= Aj[k1]*alpha;
              }
              if(k!==n) { Ai[k] -= Aj[k]*alpha; }
          }
          if(Aj[j] === 0) { return 0; }
          ret *= Aj[j];
        }
      return Math.round(ret*A[j][j]*100)/100;
  }

  /*---------------------------------------find Cramer_Rule------------------------------------------*/
  const Cramer_Rule_solve = (matrix, freeTerms) => {
    var det = detr(matrix), returnArray = [], i, tmpMatrix;

	  for(i=0; i < matrix[0].length; i++) {
		  tmpMatrix = insertInTerms(matrix, freeTerms, i)
		returnArray.push(detr(tmpMatrix)/det)
	  }
    console.log(returnArray);
	  setans(returnArray);
    setMatA(matrix);
    setMatB(freeTerms);
    document.getElementById("tbHA").colSpan = size;
  }

  /*--------------------------Create Table--------------------------*/
  const createTable = (myArray) => {
    var result = "";
    for(var i=0; i<myArray.length; i++) {
      result += "<tr>";
      for(var j=0; j<myArray[i].length; j++){
          result += "<td>"+myArray[i][j] + "</td>";
      }
      result += "</tr>";
    }
    document.getElementById("Matrix").innerHTML = result;
  }

  return (
    <div className="box">
      <div className="title">
        <h1>Cholesky Decomposition Method</h1>
      </div>
      <div className="content">
        <div className="input-box">
        <form onChange={InputChange} name='form1'>
          <label> &emsp;Size :&emsp; </label>
            <input name='SIZE' type='number' style={{width:"50px"}}/>&emsp;
        </form>
        <div id="showMatrix"></div>
        <button onClick={getVal}>submit</button>
        </div>
        <div className="showans">
          {CheckUnValid && <h4 id="ans">Input all fill in Matrix first!</h4>}
        </div>
        <div className="tb_mat">

          {/* MATRIX A */}

        <table class='table' style = {{
          border: "1px solid black",
          textAlign: "center",
          justifyContent: "center",
          width: "20vw"
        }}>
          <thead bgcolor="#000d6c">
            <tr>
              <th style={{border: "1px solid black", color: "white"}} id="tbHA"> A </th>
            </tr>
          </thead>
          <tbody id='Matrix'>
            {!CheckUnValid && MatA.length > 0 && createTable(MatA)}
          </tbody>
        </table>

        {/* MATRIX B */}

        <table class='table' style = {{
          border: "1px solid black",
          textAlign: "center",
          justifyContent: "center",
          width: "20vw"
        }}>
          <thead bgcolor="#000d6c">
            <tr>
              <th style={{border: "1px solid black", color: "white"}}> B </th>
            </tr>
          </thead>
          <tbody id='Matrix'>
            {!CheckUnValid && MatB.length > 0 && MatB.map((item) => {
              return  <tr>
                        <td style={{border: "1px solid black"}}>{item}</td>
                      </tr>
            })}
          </tbody>
        </table>

        {/* MATRIX Ans */}

        <table class='table' style = {{
          border: "1px solid black",
          textAlign: "center",
          justifyContent: "center",
          width: "20vw"
        }}>
          <thead bgcolor="#000d6c">
            <tr>
              <th style={{border: "1px solid black", color: "white"}}> Ans </th>
            </tr>
          </thead>
          <tbody id='Matrix'>
            {!CheckUnValid && ans.length > 0 && ans.map((item) => {
              return  <tr>
                        <td style={{border: "1px solid black"}}>{item}</td>
                      </tr>
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )   
};

export default Cholesky_Decomposition;