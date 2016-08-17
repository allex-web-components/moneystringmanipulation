angular.module ('allex__web_moneystringmanipulationcomponent', []);

(function (allexlib, moneystringmanipulation, module) {
  'use strict';


  module.filter ('allex_moneystringmanipulation.toMoney', function () {
    return function (input, decimals) {
      if (!allexlib.isNumber(decimals)) throw new Error('Decimals must be a number'); ///TODO: not just a number, non negative integer as well ...
      return moneystringmanipulation.toMoney(input, decimals);
    };
  });


  module.filter('allex_moneystringmanipulation.fromMoney', function () {
    return function (input, decimals) {
      if (!allexlib.isNumber(decimals)) throw new Error('decimals must be a number');
      return moneystringmanipulation.fromMoney (input, decimals);
    };
  });

})(ALLEX.lib, ALLEX.LOW_LEVEL_LIBS.allex_moneystringmanipulationlowlevellib, angular.module ('allex__web_moneystringmanipulationcomponent'));
