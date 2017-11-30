<template>
	<div>
		<nav-header></nav-header>
		<nav-bread>
			<span>Goods</span>
		</nav-bread>
		<div class="accessory-result-page accessory-page">
		  <div class="container">
		    <div class="filter-nav">
		      <span class="sortby">Sort by:</span>
		      <a href="javascript:void(0)" class="default cur">Default</a>
		      <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
		      <a href="javascript:void(0)" class="filterby stopPop" @click="showFilter">Filter by</a>
		    </div>
		    <div class="accessory-result">
		      <!-- filter -->
		      <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
		        <dl class="filter-price">
		          <dt>Price:</dt>
		          <dd><a href="javascript:void(0)" :class="{'cur':priceChicked == 'all'}" @click="priceChicked ='all'">All</a></dd>
		          <dd  v-for="(price,index) in priceFilter" @click="priceChicked = index">
		            <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur':priceChicked==index}">{{ price.startPrice }} - {{ price.endPrice }}</a>
		          </dd>
		        </dl>
		      </div>

		      <!-- search result accessories list -->
		      <div class="accessory-list-wrap">
		        <div class="accessory-list col-4">
		          <ul>
		            <li v-for="(item,index) in goodsList">
		            	<div class="pic">
		            	<a href="#">
		            		<img v-lazy="'/static/'+item.productImage" alt="">
		            	</a>
		            	</div>
		              <div class="main">
		                <div class="name">{{ item.productName }}</div>
		                <div class="price">{{ item.salePrice }}</div>
		                <div class="btn-area">
		                  <a href="javascript:;" class="btn btn--m">加入购物车</a>
		                </div>
		              </div>
		            </li>
		          </ul>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
		<div class="biaodan">
			输入id  <input type="text" class="productId" v-model="pro.productId">
			输入产品名  <input type="text" class="productName" v-model="pro.productName">
			输入价格  <input type="text" class="saleprice" v-model="pro.salePrice">
			输入图片  <input type="text" class="productImage" v-model="pro.productImage">
			<button @click="addproduct">add</button>
		</div>
		<nav-footer></nav-footer>
	</div>
</template>

<script>
    import './../assets/css/base.css'
    import './../assets/css/product.css'
    import './../assets/css/checkout.css'
    import './../assets/css/login.css'
    import NavHeader from './../components/Header.vue'
    import NavFooter from './../components/NavFooter.vue'
    import NavBread from './../components/NavBread.vue'
    import axios from 'axios'
	export default{
		components: {
			NavHeader,
			NavFooter,
			NavBread
		},
		data() {
			return {
				pro: {
					productId: '',
					productName: '',
					salePrice: '',
					productImage: ''
				},
				goodsList: [],
				priceFilter: [
				{
					startPrice: '0.00',
					endPrice: '500.00'
				},
				{
					startPrice: '500.00',
					endPrice: '1000.00'
				},
				{
					startPrice: '1000.00',
					endPrice: '2000.00'
				}],
				priceChicked: 'all',
				filterBy: false,
				overLayFlag: false
			}
		},
		mounted() {
			this.getgoodsList();
		},
		methods: {
			getgoodsList() {
				axios.get("/goods").then((result)=>{
					let res = result.data;
					this.goodsList = res.result.list;
				});
			},
			addproduct() {
				////JSON.stringify（）JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。 为了清除不想要的东西
				axios.post("/addgoods",this.pro).then((res)=> {
					console.log(res);
				}).catch((error)=> {
					console.log(error);
				});
			},
			showFilter() {
				this.filterBy = true;
				this.overLayFlag= true
			},
			closePop() {
				this.filterBy = false;
				this.overLayFlag= false
			},
			setPriceFilter(index) {
				this.priceChicked = index;
				this.closePop();
			}
		}
	}
</script>
