<template>
    <section class="calorie-table">
        <h1 class="table__title">Table UI</h1>
        <div class="table__control">
            <div class="control__wrap">
                <h3 class="sorting__title">Sorting by:</h3>
                <ul class="sorting__list">
                    <li class="sorting__item sorting__item--active">Product (100g serving)</li>
                    <li class="sorting__item">Calories</li>
                    <li class="sorting__item">Fat (g)</li>
                    <li class="sorting__item">Carbs (g)</li>
                    <li class="sorting__item">Protein (g)</li>
                    <li class="sorting__item">Iron (%)</li>
                </ul>
            </div>
            <div class="control__wrap">
                <button type="button" class="control__delete button" :disabled="selected.length === 0">
                    Delete
                    <span class="control__delete-quantity" v-show="selected.length > 0">({{selected.length}})</span>
                </button>
                <div class="select-wrap">
                    <select class="control__show-list button" v-model="perPage">
                        <option class="control__show-item" :value="10">10 Per Page</option>
                        <option class="control__show-item" :value="15">15 Per Page</option>
                        <option class="control__show-item" :value="20">20 Per Page</option>
                    </select>
                </div>

                <div class="control__page">
                    <button type="button" class="page__prev button" @click="prevPage" :disabled="!canGoPrevPage">
                        <span class="visually-hidden">Prev</span>
                        <svg class="page__prev-arrow">
                            <use xlink:href="#arrow"></use>
                        </svg>
                    </button>
                    <p class="page__field">{{perPage * (page - 1) + 1}}-{{perPage * page}} of {{$store.state.data.length}}</p>
                    <button type="button" class="page__next button" @click="nextPage" :disabled="!canGoNextPage">
                        <span class="visually-hidden">Next</span>
                        <svg class="page__next-arrow">
                            <use xlink:href="#arrow"></use>
                        </svg>
                    </button>
                </div>
                <div class="select-wrap">
                    <button type="button" @click="isSelectedFilterOpen=!isSelectedFilterOpen" class="control__select button">6 columns selected</button>
                    <div class="control__select-list" v-show="isSelectedFilterOpen">
                        <div class="control__select-wrap">
                            <input type="checkbox" class="control__select-checkbox" id="all" name="all">
                            <label for="all" class="control__select-label">Select All</label>
                        </div>
                        <div class="control__select-wrap">
                            <input type="checkbox" class="control__select-checkbox" id="product" name="product">
                            <label for="product" class="control__select-label">Product (100g serving)</label>
                        </div>
                        <div class="control__select-wrap">
                            <input type="checkbox" class="control__select-checkbox" id="calories" name="calories">
                            <label for="calories" class="control__select-label">Calories</label>
                        </div>
                        <div class="control__select-wrap">
                            <input type="checkbox" class="control__select-checkbox" id="fat" name="fat">
                            <label for="fat" class="control__select-label">Fat (g)</label>
                        </div>
                        <div class="control__select-wrap">
                            <input type="checkbox" class="control__select-checkbox" id="carbs" name="carbs">
                            <label for="carbs" class="control__select-label">Carbs (g)</label>
                        </div>
                        <div class="control__select-wrap">
                            <input type="checkbox" class="control__select-checkbox" id="protein" name="protein">
                            <label for="protein" class="control__select-label">Protein (g)</label>
                        </div>
                        <div class="control__select-wrap">
                            <input type="checkbox" class="control__select-checkbox" id="iron" name="iron">
                            <label for="iron" class="control__select-label">Iron (%)</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <table class="table">
            <tr class="caption-line">
                <th>
                    <input class="checkbox__item" v-model="isAllSelected" type="checkbox" name="all" id="all-product">
                    <label for="all-product" class="table__product"></label>
                </th>
                <th>Product(100g serving)</th>
                <th>Calories</th>
                <th>Fat (g)</th>
                <th>Carbs (g)</th>
                <th>Protein (g)</th>
                <th>Iron (%)</th>
            </tr>
            <tr class="table-line" v-for="(row,key) in visibleRows" :key="key">
                <td>
                    <input v-model="selected" class="checkbox__item" type="checkbox" name="selected" :value="row.id" :id="row.id">
                    <label :for="row.id" class="table__product"></label>
                </td>
                <td>{{row.product}}</td>
                <td>{{row.calories}}</td>
                <td>{{row.fat}}</td>
                <td>{{row.carbs}}</td>
                <td>{{row.protein}}</td>
                <td>{{row.iron}}</td>
            </tr>
        </table>
    </section>
</template>

<script>
    export default {
        name: "Table",
        data() {
            return {
                page: 1,
                perPage: 10,
                selected: [],
                isSelectedFilterOpen: false,
                columns: {

                }
            }
        },
        computed: {
            visibleRows() {
                //todo sort
                return  this.$store.state.data.slice().splice(this.perPage * (this.page - 1), this.perPage)
            },
            visibleColumns() {
                return [];
            },
            isAllSelected: {
                get() {
                    return this.selected.length === this.perPage;
                },
                set() {
                    if(this.isAllSelected) {
                        this.selected.splice(0, this.selected.length)
                    } else {
                        for (let i = 0; i < this.visibleRows.length; i++) {
                            if(this.selected.indexOf(this.visibleRows[i].id) === -1) {
                                this.selected.push(this.visibleRows[i].id);
                            }
                        }
                    }
                }
            },
            canGoPrevPage() {
                return this.page > 1;
            },
            canGoNextPage() {
                return this.page < Math.ceil(this.$store.state.data.length / this.perPage);
            }
        },
        methods: {
            prevPage() {
                if(this.canGoPrevPage) {
                    this.page--;
                    this.selected.splice(0, this.selected.length)
                }
            },
            nextPage() {
                if(this.canGoNextPage) {
                    this.page++;
                    this.selected.splice(0, this.selected.length)
                }
            },
            selectAllColumns() {

            }
        }
    }
</script>

<style scoped>

</style>
