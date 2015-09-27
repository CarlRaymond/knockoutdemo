var LineItem = function(name, item) {

	var self = this;

	this.name = name;
	this.item = ko.observable(item);
	this.overcharge = ko.observable(false);
	this.qty = ko.observable(1);

	this.effectivePrice = ko.computed(function () {
		if (self.overcharge())
			return self.item().amount + self.item().overchargeAmount;
		else
			return self.item().amount;

	});

	this.extendedPrice = ko.computed(function () {
		return self.effectivePrice() * self.qty();
	});
};


var OrderViewModel = function() {
	var self = this;

	this.lineItems = ko.observableArray();


	this.totalPrice = ko.computed(function () {

		var total = 0;
		$.each(self.lineItems(), function(index, item) {
			total += item.extendedPrice();
		});

		return total;
	});


	this.addItem = function() {
		self.LineItems.push("", self.avaialableItems[0]);
	};

	this.removeItem = function() {

	};

	this.avaialableItems = [
		{ desc: "Standard registration", amount: 195.00, overchargeAmount: 50.00 },
		{ desc: "Deluxe Registration (includes swag package", amount: 225.00, overchargeAmount: 60.00 },
		{ desc: "Budget Registration (no meals or bathroom access)", amount: 99.00, overchargeAmount: 25.00 }
	];
};


// Initialize the form
var model = new OrderViewModel();
model.lineItems.push(new LineItem("", model.avaialableItems[0]));
ko.applyBindings(model);
