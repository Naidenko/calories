<template>
    <section class="calorie-table">
        <h1 class="table__title">Table UI</h1>
        <div class="table__control">
            <div class="control__wrap">
                <h3 class="sorting__title">Sorting by:</h3>
                <ul class="sorting__list">
                    <li class="sorting__item">Product (100g serving)</li>
                    <li class="sorting__item">Calories</li>
                    <li class="sorting__item">Fat (g)</li>
                    <li class="sorting__item">Carbs (g)</li>
                    <li class="sorting__item">Protein (g)</li>
                    <li class="sorting__item">Iron (%)</li>
                </ul>
            </div>
            <div class="control__wrap">
                <button type="button" class="control__delete">Delete</button>
                <div class="select-wrap">
                    <select class="control__show-list">
                        <option class="control__show-item">10 Per Page</option>
                        <option class="control__show-item">15 Per Page</option>
                        <option class="control__show-item">20 Per Page</option>
                    </select>
                </div>

                <div class="control__page">
                    <button type="button" class="page__prev">
                        <span class="visually-hidden">Prev</span>
                        <svg class="page__prev-arrow">
                            <use xlink:href="#arrow"></use>
                        </svg>
                    </button>
                    <p class="page__field">1-10 of 25</p>
                    <button type="button" class="page__next">
                        <span class="visually-hidden">Next</span>
                        <svg class="page__next-arrow">
                            <use xlink:href="#arrow"></use>
                        </svg>
                    </button>
                </div>
                <div class="select-wrap">
                    <select class="control__select-list">
                        <option class="control__select-item">6 columns selected</option>
                        <option class="control__select-item">5 columns selected</option>
                        <option class="control__select-item">4 columns selected</option>
                        <option class="control__select-item">3 columns selected</option>
                        <option class="control__select-item">2 columns selected</option>
                        <option class="control__select-item">1 columns selected</option>
                    </select>
                </div>

            </div>
        </div>
        <table class="table">
            <tr class="caption-line">
                <th>
                    <input class="checkbox__item" type="checkbox" name="all" id="product">
                    <label for="product" class="table__product">Product(100g serving)</label>
                </th>
                <th>Calories</th>
                <th>Fat (g)</th>
                <th>Carbs (g)</th>
                <th>Protein (g)</th>
                <th>Iron (%)</th>
            </tr>
            <tr class="table-line">
                <td>
                    <input class="checkbox__item" type="checkbox" name="frozen-yogurt" id="yogurt">
                    <label for="yogurt" class="table__product">Frozen Yogurt</label>
                </td>
                <td>125</td>
                <td>224</td>
                <td>486</td>
                <td>696</td>
                <td>536</td>
            </tr>
            <tr class="table-line">
                <td>
                    <input class="checkbox__item" type="checkbox" name="ice-cream-sandwich" id="ice-cream-sandwich">
                    <label for="ice-cream-sandwich" class="table__product">Ice cream sandwich</label>
                </td>
                <td>851</td>
                <td>519</td>
                <td>735</td>
                <td>461</td>
                <td>366</td>
            </tr>
        </table>
    </section>
</template>

<script>
    export default {
        name: "Table",
        data() {
            return {
                columns: {

                }
            }
        },
        computed: {
            visibleRows() {
                return [];
            },
            visibleColumns() {
                return [];
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
