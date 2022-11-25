import React,{ useState } from 'react' // ตัวนี้เป็นฟังชั่น component

const Parser = require('expr-eval').Parser; // เเปลง string to ???

const Bisection = () => {

    const [Keepvalue,setKeepvalue] = useState ([])
    const [CheckUnValid,setCheckUnValid] = useState (false)
    const [showAns,setshowAns] = useState (false)
    const [ans,setans] = useState ()
    const [err,seterr] = useState ()
    const Bisection_solve = (XL,XR,Error,Functions) => {

        const parser = new Parser();

        function fx(x) {
            let func = parser.parse(Functions)
            return func.evaluate({ x: (x) }) //ส่งค่ากลับไปใช้
        }

        var xl = parseFloat(XL); // String to float
        var xr = parseFloat(XR);
        var xm,xold;
        var Errors = 10000000; //รอบสูงสุด
        var InputError = parseFloat(Error);
        var TempArray = [];

        if(xl!=null && xr!=null && Functions!=null && InputError!=null)
        {
            while(Errors > InputError)
            {
                xm=((xr+xl)/2);
                if(fx(xm)*fx(xr)<0)
                {
                    xold=xl;
                    xl=xm;
                }
                if(fx(xm)*fx(xr)>0)
                {
                    xold=xr;
                    xr=xm;
                }
                Errors = Math.abs((xm-xold)/xm)*100;
                let Count = [xl.toFixed(6),xr.toFixed(6),xm.toFixed(6),Errors.toFixed(6)]; // item [0],[1],[2],[3]
                TempArray.push(Count);
            }
            setans(xm.toFixed(6));
            seterr(Errors.toFixed(6));
        }
        setKeepvalue(TempArray);
    }
    const InputNumber = (e) =>
    {
        e.preventDefault()
        let xl = e.target.XL.value
        let xr = e.target.XR.value
        let errorer = e.target.Error.value
        let fu = e.target.Function.value
        if(xl && xr && errorer && fu)
        {
            setCheckUnValid(false); // ถ้ามี
            Bisection_solve(xl,xr,errorer,fu);
            setshowAns(true);
        }
        else
        {
            setCheckUnValid(true);
            setshowAns(false);
        }
    }
    return (
        <div className='box'>
            <div className="title">
                <h1>Bisection Method</h1>
            </div>
            <div className="content">
                <div className="input-box">
                    <form onSubmit={InputNumber} className="form"> 
                        <div className="inbox">
                            <label> &emsp;XL :&emsp; </label>
                                <input name='XL' placeholder='Starting XL' size='8'/>

                            <label className='text'> &emsp;Error:&emsp; </label>
                                <input name='Error' placeholder='Epsilon' size='5'/>
                        </div>
                        <p></p>
                        <div className="inbox">
                            <label> &emsp;XR :&emsp; </label>
                                <input name='XR' placeholder='Starting XR' size='8'/>

                            <label className='text'> &emsp;Function :&emsp; </label>
                                <input name='Function' placeholder='Input function here' size='30'/>
                        </div>
                        <p></p> 
                        <div className="inbox">
                            <div className="inbox-btn">
                                &emsp;<button id='btn'>Calculate</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="showans">
                    {CheckUnValid && <h4 id="ans">Input XL,XR,Error and Function first!</h4>}
                    {showAns && <h4 id="ans">The value of root is : {ans}</h4>}
                    {showAns && <h4 id="err">Error is : {err}</h4>}
                </div>
                <div className="tb">
                    <table class='table' style = {{
                        border: "1px solid black",
                        textAlign: "center",
                        justifyContent: "center",
                        width: "50vw"
                    }}>
                        <thead bgcolor="#000d6c">
                            <tr>
                                <th style={{border: "1px solid black", color: "white"}}> ITERATION </th>
                                <th style={{border: "1px solid black", color: "white"}}> XL </th>
                                <th style={{border: "1px solid black", color: "white"}}> XR </th>
                                <th style={{border: "1px solid black", color: "white"}}> XM </th>
                                <th style={{border: "1px solid black", color: "white"}}> ERROR </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!CheckUnValid && Keepvalue.length > 0 && Keepvalue.map((item,index) => {
                                return <tr key={index}>
                                            <td style={{border: "1px solid black"}}>{index}</td>
                                            <td style={{border: "1px solid black"}}>{item[0]}</td>
                                            <td style={{border: "1px solid black"}}>{item[1]}</td>
                                            <td style={{border: "1px solid black"}}>{item[2]}</td>
                                            <td style={{border: "1px solid black"}}>{item[3]}</td>
                                        </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default Bisection ;