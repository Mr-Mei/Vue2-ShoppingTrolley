new Vue({
	el:"#app",
	data:{
		productList: [],
		totalMoney: 0
	},
	filters: {

	},
	methods:{
		cartView: function() {
		        var _this = this;
		        this.$http.get("static/data/cartData.json", {"id": 123}).then(function(res) {
		          _this.productList = res.body.result.list;
		          // _this.totalMoney =  res.body.result.totalMoney;
		        });
		      }
	}
});