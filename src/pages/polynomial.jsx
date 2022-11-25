const matrixInverse = require('matrix-inverse')

const Polynomial = () => {
    let size;
    let x = []
    let y = []
    let a0,a1
    let fx

    const InputChange = (e) => {
        e.preventDefault()
        size = e.target.value;
        let inputstr = '';
        for(let i=0;i<size;i++)
        {
            inputstr+='<tr><td><input type="number" id="inx'+i+'"></input></td><td><input type="number" id="iny'+i+'"></input></td></tr>';
        }
        document.getElementById("inxy").innerHTML = inputstr;
        //console.log(inputstr);
    }

    const getVal = (e) => {
        e.preventDefault()
        let v = document.getElementById("Valuex").value;
        x.splice(0,size)
        y.splice(0,size)
        for(let i=0;i<size;i++)
        {
            x.push(parseFloat(document.getElementById('inx'+i).value));
            y.push(parseFloat(document.getElementById('iny'+i).value));
        }
        console.log(x,y);
        Linear_slove(v, size);
    }
    
    const Linear_slove = (Value, Size) => {
        let v = parseFloat(Value);
        console.log(v);
        let s = parseFloat(Size);
        let sumx = 0;
        let sumy = 0;
        let sumxx = 0;
        let sumxy = 0;
        for(let i=0;i<s;i++) {
            sumx += x[i];
            sumxx += (x[i] * x[i]);
            sumy += y[i];
            sumxy += (x[i] * y[i]);
        }

        let A = [[size,sumx],[sumx,sumxx]]
        let B = [[sumy],[sumxy]]
        let temp1 = 0, temp2 = 0;
        console.log(A);
        const InA = matrixInverse(A)
        console.log(InA.value);
        temp1 = (InA[0][0] * B[0])+(InA[0][1] * B[1])
        a0 = temp1;
        temp2 = (InA[1][0] * B[0])+(InA[1][1] * B[1])
        a1 = temp2;
        let ans = [[a0],[a1]]
        console.log(ans);
        fx = a0 + (a1 * v)
        console.log(fx);
        document.getElementById('showfx').innerHTML = fx;
    }
    return (
    <div className="box">
      <div className="title">Polynomial Regression</div>
      <div className="content">
        <div className="input-box">
            <div className="in">
                <div className="inbox">
                    <label>&emsp;Find the value :&emsp;</label>
                    <input type="number" id='Valuex'></input>
                </div>
                <p></p>
                <div className="inbox">
                    <form onChange={InputChange} name='form1'>
                        <label>&emsp;Size :&emsp;</label>
                        <input name='SIZE' type="number"></input>
                    </form>
                </div>
                <div className="inbox">
                    <div className="inbox-btn">
                        &emsp;<button id='btn' onClick={getVal}>Calculate</button>
                    </div>
                </div>
                <p></p>
                <div className="inputxy">
                    <table class='table' style = {{
                        border: "1px solid black",
                        textAlign: "center",
                        justifyContent: "center",
                        width: "80vh"
                    }}>
                        <thead bgcolor="#000d6c">
                            <tr>
                                <th style={{border: "1px solid black", color: "white"}}> X </th>
                                <th style={{border: "1px solid black", color: "white"}}> Y </th>
                            </tr>
                        </thead>
                        <tbody id='inxy'>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="showans">
            <h1 id='showfx'></h1>
        </div>
      </div>
    </div>
    )
}

export default Polynomial;