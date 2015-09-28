// Represents one line on the form
function LineItem(name, item) {

	var self = this;

	this.name = name;
	this.item = ko.observable(item);
	this.overcharge = ko.observable(false);
	this.qty = ko.observable(1);

	this.effectiveAmount= ko.computed(function () {
		if (self.overcharge())
			return self.item().amount + self.item().overchargeAmount;
		else
			return self.item().amount;
	});

	this.extendedAmount = ko.computed(function () {
		return self.effectiveAmount() * self.qty();
	});
}

// Represents the entire form model
function OrderViewModel() {
	var self = this;

	this.availableItems = [
		{ description: "Standard registration", amount: 195.00, overchargeAmount: 50.00 },
		{ description: "Deluxe Registration (includes swag package)", amount: 225.00, overchargeAmount: 60.00 },
		{ description: "Budget Registration (no meals or bathroom access)", amount: 99.00, overchargeAmount: 25.00 }
	];

	this.lineItems = ko.observableArray([ new LineItem("", self.availableItems[0])]);

	this.totalAmount = ko.computed(function () {

		var total = 0;
		$.each(self.lineItems(), function (index, item) {
      total += this.extendedAmount();
		});
		return total;
	});

	this.addItem = function() {
		self.lineItems.push(new LineItem("", self.availableItems[0]));
	};

	this.removeItem = function(item) {
		self.lineItems.remove(item);
	};
}


// Initialize the form
var model = new OrderViewModel();
ko.applyBindings(model);
