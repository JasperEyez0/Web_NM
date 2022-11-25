import { getValue } from '@testing-library/user-event/dist/utils';
import React,{ useState } from 'react' // ตัวนี้เป็นฟังชั่น component
import { findRenderedComponentWithType } from 'react-dom/test-utils';
const math = require('mathjs');

const matrixInverse = require('matrix-inverse')

const Linear = () => {
    let size,v;
    let array=[];
    let Xarray=[];
    let Yarray=[];
    let temparray = [];
    let value,textt
    let textfd
    let apidataarray=[]
    let apidataarray2=[]
    let ar
    let [getSize,setSize] = useState('')
    let [getV,setV] = useState('')
    let a0,a1
    let fx

    const getData = (e) => {
        e.preventDefault();
        let d = document.getElementById("example")
        value = d.value;
        textt = d.options[d.selectedIndex].text;

        if(value !== 0) {
            fetch('http://localhost:3000/Regression_Size').then(res => {
                return res.json();
            }).then(data => {
                setSize(data[value].getSize)
                setV(data[value].getV)
            })
            .catch(err => console.log(err))
        }
        getValue();
    }

    const getValue = (e) => {
        e.preventDefault();
        document.getElementById('matrix').innerHTML = ""
        size = getSize
        v = getV

        let d = document.getElementById("example")
        value = d.value;
            fetch('http://localhost:3000/Regression_Size').then(res => {
                return res.json();
            }).then(data => {
                console.log(data) //show db.json
                console.log(data[value]) // console.log for shit
            })

            .catch(err => console.log(err))
            createMatrix(size);

            putdata()

            console.log("====")
            console.log(apidataarray)
    }

    const putdata = () => {
        if(value !== 0) {
            fetch('http://localhost:3000/RegressionExample').then(res => {
                return res.json();
            }).then(data2 => {
                ar = Object.entries(data2[value])
                for(var i in ar) {
                    apidataarray.push(ar[i][1])
                }
                apidataarray2 = apidataarray
                let start = 1
                for(let row =1;row<=size;row++) {
                    textfd = document.getElementById('matrix_idex_row'+row+'col'+1)
                    textfd.setAttribute("value", apidataarray2[start])
                    start++
                    textfd=document.getElementById('matrix_index_row'+row +'col'+2)
                    textfd.setAttribute("value", apidataarray2[start])
                    start++
                }
            })
            .catch(err => console.log(err))
        }
    }

    const createMatrix = (size) => {
        for(var row=1;row<=size;row++) {
            for(var col=1;col<=2;col++) {
                document.getElementById('matrix').innerHTML += '<input type="text" id="matrix_index_row'+row +'col'+(col)+'" name="" placeholder="-" size=3>'
            }
            document.getElementById('matrix').innerHTML += '<br/>'
        }
        document.getElementById('cal_button').innerHTML = ""//create button
        document.getElementById('cal_button').innerHTML += '<button id="btn" onclick="calculate()">Calculate the matrix</button>'
        document.getElementById('cal_button').onclick = function(){calculate()};//button call calculate function
    }

    const showoutputarray = () => {
        document.getElementById('outputarray').innerHTML = ""

        for(var row=1;row<=size;row++)
      {
        for(var col=1;col<=2;col++)
        {
          var getvalue = parseFloat(document.getElementById('matrix_index_row'+row +'col'+(col)).value)
          temparray.push(getvalue)
        }
        array.push(temparray)
        temparray = [];
      }
      for(var i = 0;i<size;i++)
      {
        document.getElementById('outputarray').innerHTML += "[ "
        for(var j = 0;j<1;j++)
        {
            document.getElementById('outputarray').innerHTML += ""+array[i][0]+"x "
            document.getElementById('outputarray').innerHTML += " = "+array[i][1]+"y] <br/>"
        }
      }
    }
    
    const calculate = () => {
        showoutputarray()

        for(var a=0;a<size;a++)
        {
            Xarray.push(array[a][0]);
        }
        for(var b=0;b<size;b++)
        {
            Yarray.push(array[b][1]);
        }

        Linear_slove(v,size);
    }
    
    const Linear_slove = (Value, size) => {
        let v = parseFloat(Value);
        console.log(v);
        let s = parseFloat(size);
        let sumx = 0;
        let sumy = 0;
        let sumxx = 0;
        let sumxy = 0;
        for(let i=0;i<s;i++) {
            sumx += Xarray[i];
            sumxx += (Xarray[i] * Xarray[i]);
            sumy += Yarray[i];
            sumxy += (Xarray[i] * Yarray[i]);
        }

        let A = [[size,sumx],[sumx,sumxx]]
        let B = [[sumy],[sumxy]]
        let temp1 = 0, temp2 = 0;
        //console.log(A);
        const InA = matrixInverse(A)
        //console.log(InA.value);
        temp1 = (InA[0][0] * B[0])+(InA[0][1] * B[1])
        a0 = temp1;
        temp2 = (InA[1][0] * B[0])+(InA[1][1] * B[1])
        a1 = temp2;
        let ans = [[a0],[a1]]
        console.log(ans);
        fx = a0 + (a1 * v)
        //console.log(fx);
        document.getElementById('showfx').innerHTML = fx;
    }

    return(
            <div className="box">
            <div className="title">Linear Regression</div>
            <div className="content">
                <div className="input-box">
                <form onSubmit={getValue}>
                    <div className="in">
                        <div className="inbox">
                            <label>&emsp;Find the value :&emsp;</label>
                            <input 
                                name='v'
                                placeholder='Ex: X that we want to know' 
                                value = {getV}
                                onChange={event => setV(event.target.value)}
                            />
                        </div>
                        <p></p>
                        <div className="inbox">
                            <label>&emsp;Size :&emsp;</label>
                            <input 
                                name='size'
                                placeholder='Number of size.'
                                value = {getSize}
                                onChange={event => setSize(event.target.value)}
                            />
                        </div>
                        <div className="inbox">
                            <div className="inbox-btn">
                                &emsp;<button id='btn'>Submit</button>
                                <label htmlFor='example'>&emsp;example :&emsp;</label>
                                <select name="example" id="example" onChange={getData}>
                                    <option disabled selected value="0">Select โจทย์</option>
                                    <option value="1">API ex1</option>
                                    <option value="2">API ex2</option>
                                    <option value="3">API ex3</option>
                                    <option value="4">API ex4</option>
                                    <option value="5">API ex5</option>
                                    </select>
                            </div>
                            <p></p>
                            <p id = 'matrix'></p>
                            <p id = 'cal_button'></p>
                            <p id = 'outputarray'></p>
                            <h3><p id = 'final'></p></h3>
                            <p id = 'proof'></p>
                            <p id = 'chart'></p>
                        </div>
                        <p></p>
                    </div>
                </form>
                </div>
                <div className="showans">
                    <h1 id='showfx'></h1>
                </div>
            </div>
            </div>
        )
}

export default Linear;