<template>
    <div>
        <div  class="filter-item mb-3 is-center">
            <el-button @click="resetFilter()" class="mb-3" type="primary" round>Очистить фильтры</el-button>
        </div>

        <div class="filter-item mb-3">
            <label class="filter-item__label">Страна</label>
            <el-select v-model="country" filterable placeholder="Select">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="filter-item mb-3">
            <label class="filter-item__label">Тип</label>
            <el-select v-model="type" multiple placeholder="Select">
                <el-option
                        v-for="item in optionsType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>

        <div class="filter-item mb-3">
            <label class="filter-item__label stars is-center">Звезды</label>
            <el-checkbox-group v-model="stars" size="medium">
                <el-checkbox :label="1">1 звезда</el-checkbox>
                <el-checkbox :label="2">2 звезды</el-checkbox>
                <el-checkbox :label="3">3 звезды</el-checkbox>
                <el-checkbox :label="4">4 звезды</el-checkbox>
                <el-checkbox :label="5">5 звезды</el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="filter-item mb-3">
            <label class="filter-item__label">Количесво отзывов от</label>
            <el-input-number v-model="reviews_amount" :min="0" :max="1000"></el-input-number>
        </div>
        <div class="filter-item mb-3">
            <label class="filter-item__label">Цена до</label>
            <div class="filter-item__slider">
                <span>0</span>
                <el-slider v-model="min_price" :max="maxPrice"></el-slider>
                <span>{{maxPrice}}</span>
            </div>
        </div>
        <div  class="filter-item mb-3 is-center">
            <el-button @click="applyFilter()" class="mb-3" type="primary" round>Применить фильтр</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'FiltersComponent',
        props: {
            maxPrice: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                options: [{
                    value: 'Греция',
                    label: 'Греция'
                }, {
                    value: 'Украина',
                    label: 'Украина'
                }, {
                    value: 'Германия',
                    label: 'Германия'
                }],

                optionsType: [{
                    value: 'Апартаменты',
                    label: 'Апартаменты'
                }, {
                    value: 'Отель',
                    label: 'Отель'
                }],


                country: '',
                type: [],
                stars: [],
                reviews_amount: 0,
                min_price: 0
            }
        },
        methods: {
            resetFilter() {
                this.country = ''
                this.type= []
                this.stars= []
                this.reviews_amount= 0
                this.min_price= 0

                this.$emit('reset')
            },
            applyFilter(){
                const { country, type, stars, reviews_amount, min_price } = this
                this.$emit('apply', {country, type, stars, reviews_amount, min_price})
            }
        }
    }
</script>
<style>
    .is-center {
        text-align: center!important;
    }
    .filter-item .filter-item__label {
        display: block;
        text-align: left;
        margin: 0 0 5px;
    }

    .filter-item .el-select,
    .filter-item .el-checkbox {
        display: block;
    }
    .filter-item .el-checkbox {
        margin: 0 0 5px 0!important;
    }
    .filter-item .stars {
        background-color: #42b983;
        padding: 5px 2px;
        color: white;
    }
    .filter-item .filter-item__slider {
        display: flex;
        align-items: center;
    }
    .filter-item .filter-item__slider .el-slider {
        margin: 0 10px;
        width: 100%;
    }

</style>
