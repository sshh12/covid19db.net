class Case {

  constructor(code, name, date, location, newCases, percentages, derivatives, history) {
    this.code = code;
    this.name = name;
    this.date = date;
    this.location = location;
    this.newCases = newCases;
    this.percentages = percentages;
    this.derivatives = derivatives;
    this.history = history;
  }

  static fromJSON(json) {
    var obj = JSON.parse(json);
    return new Case(
      obj.country.codes.alpha3Code,
      obj.country.name,
      obj.date,
      obj.location,
      obj.totals,
      obj.new,
      obj.percentages,
      obj.derivativeNew,
      obj.history
    );
  }

}
