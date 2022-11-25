import React,{ useState } from 'react' // ตัวนี้เป็นฟังชั่น component

const Gauss_Elimination = () => {
  const [CheckUnValid,setCheckUnValid] = useState (false)
  const [ans,setans] = useState ([])
  const [MatA,setMatA] = useState ([])
  const [MatB,setMatB] = useState ([])
  let A = []; //[[]]
  let B = [];
  let C = [];
  let size;
  let row, col;

  /*---------------------------------------get value------------------------------------------*/
  const getVal = (e) => {
    A.splice(0,A.length)  //delete all value in array
    B.splice(0,B.length)  //delete all value in array
    C.splice(0,A.length)  //delete all value in array
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
    row = size;
    col = B.length + 1;
    //console.log(A, B);
    e.preventDefault()
    // let a = e.target.A
    // let b = e.target.B
    if(A && B)
    {
      setCheckUnValid(false);
      Gauss_Elimination_solve(getMatrix(A,B));
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

  // /*---------------------------------------Get Matrix------------------------------------------*/
  const getMatrix = (A, B) => {
    for(let i=0;i<size;i++)
    {
      C.push([])
      for(let j=0;j<size;j++)
      {
        C[i].push(A[i][j])
      }
      C[i].push(B[i][0])
    }
    return C;
  }

  /*---------------------------------------find Gauss_Elimination------------------------------------------*/
  const Gauss_Elimination_solve = (mat) => {
    // console.log(row);
    // console.log(col);
    let result = Array(row).fill()
    if (col - row !== 1) {
      console.log("mat required is the augmented matrix")
    }
    for(let i=0;i<row;i++) {
      for(let j=0;j<i;j++) {
        let temp = mat[i][j] / mat[j][j]
        mat[i].forEach((val, idx) => {
          mat[i][idx] -= mat[j][idx] * temp
        })
      }
    }
    for(let t=row-1;t>=0;t--) {
      let divisor = result.reduceRight((pre,cur,idx) => {
          if (cur === undefined) {
              return pre
          } else {
              return pre - mat[t][idx] * cur
          }
      }, mat[t][col - 1])
      result[t] = (divisor / mat[t][t]).toFixed(4)
    }
    console.log(result)
	  setans(result);
    setMatA(A);
    setMatB(B);
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
        <h1>Gauss Elimination Method</h1>
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

export default Gauss_Elimination;