define(['underscore', 'hbs!./toolbar'], function(_, template) {

	'use strict';

	return {
		initialize: function() {

			this.validCurrentPage = 0;

			_.bindAll(this);

			this.render();

			this.cacheElements();
			this.attachEvents();

			this.sandbox.on('changePage', this.setCurrentPage);
		},

		render: function() {
			this.html(template({'nbPage' : this.options.nbPage}));
		},

		cacheElements: function() {
			this.$previous = this.$el.find('.page-less');
			this.$next = this.$el.find('.page-more');
			this.$currentPage = this.$el.find('.current-page');
		},

		attachEvents: function() {
			this.$previous.on('click', this.previousPage);
			this.$next.on('click', this.nextPage);
			this.$currentPage.on('change', this.changeCurrentPage);
		},

		previousPage: function() {
			this.sandbox.log('[WIDGET:toolbar-navigation] input previous page click');
			this.sandbox.navigation.changePage('-');
		},

		nextPage: function() {
			this.sandbox.log('[WIDGET:toolbar-navigation] input next page click');
			this.sandbox.navigation.changePage('+');
		},

		changeCurrentPage: function(e) {
			this.sandbox.log('[WIDGET:toolbar-navigation] input keyUp fired : ' + e.target.value);
			if (!this.sandbox.navigation.changePage(e.target.value))
				this.$currentPage.val(this.validCurrentPage);	
		},

		setCurrentPage: function(pageNumber) {
			this.sandbox.log('[WIDGET:toolbar-navigation] changePage received : ' + pageNumber);
			this.$currentPage.val(pageNumber);
			this.validCurrentPage = pageNumber;
		}

	};
});
