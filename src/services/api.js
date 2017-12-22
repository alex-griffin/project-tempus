const api = {
  defaultSubjects: [
    {
      name: "pre-algebra",
      id: "012",
      cards: [
        {
          prompt: "f`(x) of x^2",
          answer: "2x",
          attempted: 20,
          correct: 15
        },
        {
          prompt: "f`(x) of e^x",
          answer: "e^x",
          attempted: 20,
          correct: 11
        },
        {
          prompt: "f`(x) of sin(x)",
          answer: "cos(x)",
          attempted: 20,
          correct: 13
        },
        {
          prompt: "f`(x) of cos(x)",
          answer: "-sin(x)",
          attempted: 20,
          correct: 20
        },
        {
          prompt: "f`(x) of tan(x)",
          answer: "sec^2(x)",
          attempted: 20,
          correct: 19
        },
        {
          prompt: "f`(x) of cot(x)",
          answer: "-csc^2(x)",
          attempted: 20,
          correct: 15
        },
        {
          prompt: "f`(x) of sec(x)",
          answer: "sec(x)tan(x)",
          attempted: 20,
          correct: 16
        },
        {
          prompt: "f`(x) of csc(x)",
          answer: "-csc(x)cot(x)",
          attempted: 20,
          correct: 1
        },
        {
          prompt: "f`(x) of f(x)g(x)",
          answer: "f`(x)g(x) + f(x)g`(x)",
          attempted: 20,
          correct: 8
        },
        {
          prompt: "f`(x) of f(x) / g(x)",
          answer: "(f`(x)g(x) - f(x)g`(x)) / g(x)^2",
          attempted: 20,
          correct: 11
        },
      ]
    },
    {
      name: "calculus",
      id: "000",
      cards: [
        {
          prompt: "f`(x) of x^2",
          answer: "2x",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of e^x",
          answer: "e^x",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of sin(x)",
          answer: "cos(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of cos(x)",
          answer: "-sin(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of tan(x)",
          answer: "sec^2(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of cot(x)",
          answer: "-csc^2(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of sec(x)",
          answer: "sec(x)tan(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of csc(x)",
          answer: "-csc(x)cot(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of f(x)g(x)",
          answer: "f`(x)g(x) + f(x)g`(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of f(x) / g(x)",
          answer: "(f`(x)g(x) - f(x)g`(x)) / g(x)^2",
          attempted: 0,
          correct: 0
        },
      ]
    },
    {
      name: "trig",
      id: "001",
      cards: [
        {
          prompt: "f`(x) of x^2",
          answer: "2x",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of e^x",
          answer: "e^x",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of sin(x)",
          answer: "cos(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of cos(x)",
          answer: "-sin(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of tan(x)",
          answer: "sec^2(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of cot(x)",
          answer: "-csc^2(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of sec(x)",
          answer: "sec(x)tan(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of csc(x)",
          answer: "-csc(x)cot(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of f(x)g(x)",
          answer: "f`(x)g(x) + f(x)g`(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of f(x) / g(x)",
          answer: "(f`(x)g(x) - f(x)g`(x)) / g(x)^2",
          attempted: 0,
          correct: 0
        },
      ]
    },
    {
      name: "algebra I",
      id: "002",
      cards: [
        {
          prompt: "f`(x) of x^2",
          answer: "2x",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of e^x",
          answer: "e^x",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of sin(x)",
          answer: "cos(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of cos(x)",
          answer: "-sin(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of tan(x)",
          answer: "sec^2(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of cot(x)",
          answer: "-csc^2(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of sec(x)",
          answer: "sec(x)tan(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of csc(x)",
          answer: "-csc(x)cot(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of f(x)g(x)",
          answer: "f`(x)g(x) + f(x)g`(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of f(x) / g(x)",
          answer: "(f`(x)g(x) - f(x)g`(x)) / g(x)^2",
          attempted: 0,
          correct: 0
        },
      ]
    },
    {
      name: "algebra II",
      id: "003",
      cards: [
        {
          prompt: "f`(x) of x^2",
          answer: "2x",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of e^x",
          answer: "e^x",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of sin(x)",
          answer: "cos(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of cos(x)",
          answer: "-sin(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of tan(x)",
          answer: "sec^2(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of cot(x)",
          answer: "-csc^2(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of sec(x)",
          answer: "sec(x)tan(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of csc(x)",
          answer: "-csc(x)cot(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of f(x)g(x)",
          answer: "f`(x)g(x) + f(x)g`(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of f(x) / g(x)",
          answer: "(f`(x)g(x) - f(x)g`(x)) / g(x)^2",
          attempted: 0,
          correct: 0
        },
      ]
    },
    {
      name: "geometry",
      id: "004",
      cards: [
        {
          prompt: "f`(x) of x^2",
          answer: "2x",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of e^x",
          answer: "e^x",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of sin(x)",
          answer: "cos(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of cos(x)",
          answer: "-sin(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of tan(x)",
          answer: "sec^2(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of cot(x)",
          answer: "-csc^2(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of sec(x)",
          answer: "sec(x)tan(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of csc(x)",
          answer: "-csc(x)cot(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of f(x)g(x)",
          answer: "f`(x)g(x) + f(x)g`(x)",
          attempted: 0,
          correct: 0
        },
        {
          prompt: "f`(x) of f(x) / g(x)",
          answer: "(f`(x)g(x) - f(x)g`(x)) / g(x)^2",
          attempted: 0,
          correct: 0
        },
      ]
    }
  ],
  get subjects() {return this.defaultSubjects},

  getAll: function() {
    return this.subjects;
  },
  getName: function(name) {
    return this.subjects.filter((e) => e.name == name)[0];
  }
}

export default api;
