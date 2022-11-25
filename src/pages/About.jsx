const About = () => {
  const inputArray = [
    {
      squareMeters: 10,
      priceInDollars: 5
    },
    {
      squareMeters: 15,
      priceInDollars: 9
    },
    {
      squareMeters: 20,
      priceInDollars: 15
    },
    {
      squareMeters: 30,
      priceInDollars: 18
    },
    {
      squareMeters: 40,
      priceInDollars: 22
    },
    {
      squareMeters: 50,
      priceInDollars: 30
    },
    {
      squareMeters: 60,
      priceInDollars: 35
    }
    ,
    {
      squareMeters: 70,
      priceInDollars: 38
    },
    {
      squareMeters: 80,
      priceInDollars: 43
    }
  ];
  function linearRegression(inputArray, xLabel, yLabel) {
    const x = inputArray.map((element) => element[xLabel]);
    const y = inputArray.map((element) => element[yLabel]);
    const sumX = x.reduce((prev, curr) => prev + curr, 0);
    const avgX = sumX / x.length;
    const xDifferencesToAverage = x.map((value) => avgX - value);
    const xDifferencesToAverageSquared = xDifferencesToAverage.map(
      (value) => value ** 2
    );
    const SSxx = xDifferencesToAverageSquared.reduce(
      (prev, curr) => prev + curr,
      0
    );
    const sumY = y.reduce((prev, curr) => prev + curr, 0);
    const avgY = sumY / y.length;
    const yDifferencesToAverage = y.map((value) => avgY - value);
    const xAndYDifferencesMultiplied = xDifferencesToAverage.map(
      (curr, index) => curr * yDifferencesToAverage[index]
    );
    const SSxy = xAndYDifferencesMultiplied.reduce(
      (prev, curr) => prev + curr,
      0
    );
    const slope = SSxy / SSxx;
    const intercept = avgY - slope * avgX;
    return (x) => intercept + slope * x;
  }

  const linReg = linearRegression(inputArray, "squareMeters", "priceInDollars");
  console.log(linReg(100)); // => 94666.38513513515

  return (
    <div className="box">
      <div className="title">About</div>
      <div className="content">
        <div className="text">
          <label>
            เว็บไซต์นี้เป็นส่วนหนึ่งของรายวิชา Numerical Method และ Object-Oriented Programming<br />
            จัดทำโดย<br />
            น.ส.นันทินี แสวงโชคพาหะ
          </label>
        </div>
      </div>
    </div>
  );
};

export default About;
