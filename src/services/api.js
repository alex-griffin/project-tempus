const api = {
  defaultSubjects: [
    {
      name: "calculus",
      cards: [
        {
          prompt: "f`(x) of x^2",
          answer: "2x"
        },
        {
          prompt: "f`(x) of e^x",
          answer: "e^x"
        },
        {
          prompt: "f`(x) of sin(x)",
          answer: "cos(x)"
        },
        {
          prompt: "f`(x) of cos(x)",
          answer: "-sin(x)"
        },
        {
          prompt: "f`(x) of tan(x)",
          answer: "sec^2(x)"
        },
        {
          prompt: "f`(x) of cot(x)",
          answer: "-csc^2(x)"
        },
        {
          prompt: "f`(x) of sec(x)",
          answer: "sec(x)tan(x)"
        },
        {
          prompt: "f`(x) of csc(x)",
          answer: "-csc(x)cot(x)"
        },
        {
          prompt: "f`(x) of f(x)g(x)",
          answer: "f`(x)g(x) + f(x)g`(x)"
        },
        {
          prompt: "f`(x) of f(x) / g(x)",
          answer: "(f`(x)g(x) - f(x)g`(x)) / g(x)^2"
        },
      ]
    }
  ],
  get subjects() {return this.defaultSubjects},

  getAll: function () {
    return this.subjects;
  },
}

export default api;
