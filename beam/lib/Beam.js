var BEAM = {}
BEAM.extend  = function(Child, Parent) {
  var F = function(){};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}

/* Bootstrappin Beam OS */
BeamStorageManager.init();