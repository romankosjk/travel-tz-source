<template>
    <el-container style="min-height: 100%">
        <el-main>
            <div class="filter-container">
                <div class="filter-container__sidebar">
                    <FiltersComponent
                            @reset="clearFilter()"
                            @apply="applyFilter"
                            :max-price="max_price"
                    />
                </div>
                <div class="filter-container__main" style="padding-left: 30px">
                    <el-search-table-pagination
                            type="local"
                            :data="hostelsData"
                            :page-sizes="[3, 10]"
                            :columns="columns"
                            empty-text="Отелей не найдено"
                            pagination-layout="prev, pager, next">
                        <template slot="append" slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="primary" size="small">Забронировать</el-button>
                        </template>
                    </el-search-table-pagination>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import FiltersComponent from './components/aside/FiltersComponent.vue'
    import { getHostels } from './api/hotels'

    export default {
        name: 'App',
        components: {
            FiltersComponent
        },
        data() {
            return {
                hostelsData: [],
                hostelsDataFilter: [],
                columns: [
                    { prop: 'name', label: 'Название', width: 180 },
                    { prop: 'description', label: 'Описание', minWidth: 180 },
                    { slotName: 'append', label: '', width: 160 },
                ],
                filters: [
                    {
                        prop: "country",
                        type : "strong"
                    },
                    {
                        prop: "type",
                        type : "array"
                    },
                    {
                        prop: "stars",
                        type : "array"
                    },
                    {
                        prop: "reviews_amount",
                        type : "number"
                    },
                    {
                        prop: "min_price",
                        type : "number"
                    }],
                max_price: 0
            }
        },
        methods: {
            clearFilter() {
             this.applyFilter(null)
            },
            maxPrice () {
                let max = []
                this.hostelsData.forEach(val => {
                   max.push(parseInt(val.min_price))
                })

                this.max_price = Math.max.apply(Math, max)

            },
            applyFilter(filter){
                this.hostelsData = this.hostelsDataFilter

                if (filter === null) return

                this.filters.forEach(val => {
                    if (val.type === "strong") {
                        this.hostelsData = this.hostelsData.filter(x => {
                            return filter[val.prop].length ? filter[val.prop] === x[val.prop] : true
                        })
                    }
                    if (val.type === "number") {

                        this.hostelsData = this.hostelsData.filter(x => {
                            return filter[val.prop] > 0 ? filter[val.prop] <= x[val.prop] : true
                        })
                    }
                    if (val.type === "array") {
                        this.hostelsData = this.hostelsData.filter(x => {
                            return filter[val.prop].length ? filter[val.prop].find(element => element === x[val.prop]) : true
                        })
                    }
                })
            },
            handleClick(e) {
                this.$alert(`Забронировать для Вас отель: ${ e.name }`, 'Оформить бронь', {
                    confirmButtonText: 'OK',
                    callback: () => {
                        this.$message({
                            type: 'success',
                            message: `Отель: ${ e.name } забронирован`
                        });
                    }
                });
            }
        },
        created () {
            getHostels().then(res => {
                this.hostelsData = res.data.hotels
                this.hostelsDataFilter = res.data.hotels

                this.maxPrice()
            })
        }
    }
</script>

<style>
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    /* make sure to set some focus styles for accessibility */
    :focus {
        outline: 0;
    }

    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    body {
        line-height: 1;
    }

    html, body {
        height: 100%;
    }

    .mb-3 {
        margin-bottom: 1rem;
    }
    .filter-container {
        height: 100%;
    }
    .filter-container__sidebar {
        width: 100%;
    }
    .filter-container__main {
        width: 100%;
    }
    @media (min-width: 768px) {
        .filter-container {
            display: flex;
        }
        .filter-container__sidebar {
            min-width: 250px;
            max-width: 250px;
        }
        .filter-container__main {
            padding-left: 30px;
        }
    }
</style>
