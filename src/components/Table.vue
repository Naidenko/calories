<template>
    <section class="calorie-table">
        <h1 class="table__title">Table UI</h1>
        <div class="table__control">
            <div class="control__wrap">
                <h3 class="sorting__title">Sorting by:</h3>
                <ul class="sorting__list">
                    <li class="sorting__item" v-for="(column, key) in columns" :key="key"
                    :class="{'sorting__item--active': key === mainColumnIndex}"
                    @click="mainColumnIndex = key">{{column.name}}</li>
                </ul>
            </div>
            <div class="control__wrap">
                <button type="button" class="control__delete button" @click="confirmDelete()"
                        :disabled="selected.length === 0">
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
                    <button type="button"
                            @click="isSelectedFilterOpen=!isSelectedFilterOpen"
                            class="control__select button">
                        {{visibleColumns.length}} column{{visibleColumns.length>1?'s':''}} selected
                    </button>
                    <div class="control__select-list" v-show="isSelectedFilterOpen">
                        <div class="control__select-wrap">
                            <input v-model="isAllColumnSelected" type="checkbox" class="control__select-checkbox" id="all" name="all">
                            <label for="all" class="control__select-label">Select All</label>
                        </div>
                        <div class="control__select-wrap" v-for="(column, key) in columns" :key="key">
                            <input type="checkbox" class="control__select-checkbox" :id="column.property"
                                   :name="column.property" v-model="column.isVisible" :disabled="key === mainColumnIndex">
                            <label :for="column.property" class="control__select-label">{{column.name}}</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <table class="table">
            <tr v-if="visibleColumns.length === 0">
                <td>Please select at least one column</td>
            </tr>
            <template v-else>
                <tr class="caption-line">
                    <th>
                        <input class="checkbox__item" v-model="isAllSelected" type="checkbox" name="all" id="all-product">
                        <label for="all-product" class="table__product"></label>
                    </th>
                    <th v-for="(column, key) in visibleColumns" :key="key">
                        <span class="sorting" @click="changeSorting()" v-if="key === 0 && mainColumnIndex !== null">
                            {{column.name}}
                            <i v-if="sorting !== null"
                               :class="{'sorting-asc': sorting === 'asc', 'sorting-desc': sorting === 'desc'}">
                            </i>
                        </span>
                        <span v-else>
                            {{column.name}}
                        </span>
                    </th>
                    <th></th>
                </tr>
                <tr class="table-line" v-for="(row,key) in visibleRows" :key="key">
                    <td>
                        <input v-model="selected" class="checkbox__item" type="checkbox" name="selected" :value="row.id" :id="row.id">
                        <label :for="row.id" class="table__product"></label>
                    </td>
                    <td v-for="(column, key2) in visibleColumns" :key="key2">{{row[column.property]}}</td>
                    <td>
                        <span class="table__delete" :id="'delete_' + row.id" @click="confirmDelete([row.id])">
                            <svg class="delete-picture">
                                <use xlink:href="#delete"></use>
                            </svg>
                            delete
                        </span>
                    </td>
                </tr>
            </template>
        </table>
        <delete-confirm-popup
            @confirm='initDelete()'
            ref="deleteConfirmPopup"
            :style="deletePopupStyles">
        </delete-confirm-popup>
    </section>
</template>

<script>
    import DeleteConfirmPopup from "./DeleteConfirmPopup";
    export default {
        name: "Table",
        components: {DeleteConfirmPopup},
        data() {
            return {
                page: 1,
                perPage: 10,
                selected: [],
                isSelectedFilterOpen: false,
                columns: [
                    {
                        name: 'Product(100g serving)',
                        property: 'product',
                        isVisible: true
                    },
                    {
                        name: '	Calories',
                        property: 'calories',
                        isVisible: true
                    },
                    {
                        name: 'Fat (g)',
                        property: 'fat',
                        isVisible: true
                    },
                    {
                        name: 'Carbs (g)',
                        property: 'carbs',
                        isVisible: true
                    },
                    {
                        name: 'Protein (g)',
                        property: 'protein',
                        isVisible: true
                    },
                    {
                        name: 'Iron (%)',
                        property: 'iron',
                        isVisible: true
                    },
                ],
                mainColumnIndex: null,
                sorting: null,
                deletingIds: [],
                deletingSingle: true,
            }
        },
        computed: {
            visibleRows() {
                let data = this.$store.state.data.slice();
                if(this.sorting !== null) {
                    data.sort((a, b) => {
                        if (a[this.columns[this.mainColumnIndex].property] > b[this.columns[this.mainColumnIndex].property]) {
                            return 1;
                        }
                        if (a[this.columns[this.mainColumnIndex].property] < b[this.columns[this.mainColumnIndex].property]) {
                            return -1;
                        }
                        return 0;
                    });
                    if(this.sorting === 'desc') {
                        data.reverse();
                    }

                }
                return data.splice(this.perPage * (this.page - 1), this.perPage)
            },
            visibleColumns() {
                let visibleColumns = [];
                if(this.mainColumnIndex !== null) {
                    visibleColumns.push(this.columns[this.mainColumnIndex]); //first column
                }
                for (let i = 0; i < this.columns.length; i++) {
                    if(i !== this.mainColumnIndex && this.columns[i].isVisible) {
                        visibleColumns.push(this.columns[i]);
                    }
                }
                return visibleColumns;
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
            isAllColumnSelected: {
                get() {
                    return this.columns.length === this.visibleColumns.length;
                },
                set() {
                    if(this.isAllColumnSelected) {
                        for (let i = 0; i < this.columns.length; i++) {
                            if(i !== this.mainColumnIndex) {
                                this.columns[i].isVisible = false;
                            }
                        }
                    } else {
                        for (let i = 0; i < this.columns.length; i++) {
                             this.columns[i].isVisible = true;
                        }
                    }
                }
            },
            canGoPrevPage() {
                return this.page > 1;
            },
            canGoNextPage() {
                return this.page < Math.ceil(this.$store.state.data.length / this.perPage);
            },
            deletePopupStyles() {
                if(!this.deletingSingle) {
                    return {
                        top: '200px',
                        right: 'calc(50% - 127px)',
                    }
                } else {
                    let rowId = this.deletingIds[0];
                    let element = document.getElementById('delete_' + rowId);
                    if(element !== null) {
                        let elementPosition = element.getBoundingClientRect();
                        return {
                            top: elementPosition.top + 30 + 'px',
                            right: '63px'
                        }
                    }

                    return {};
                }

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
            changeSorting() {
                switch (this.sorting) {
                    case null:
                        this.sorting = 'asc';
                        break;
                    case 'asc':
                        this.sorting = 'desc';
                        break;
                    case 'desc':
                        this.sorting = null;
                        break;
                }
            },
            initDelete() {
                this.$refs.deleteConfirmPopup.hidePopup();
                this.$store.dispatch('delete', this.deletingIds).then(()=>{
                    if(this.deletingIds.length > 1) {
                        this.selected.splice(0, this.selected.length);
                    } else {
                        let index = this.selected.indexOf(this.deletingIds[0]);
                        if(index > -1) {
                            this.selected.splice(index, 1);
                        }
                    }
                    this.deletingIds.splice(0, this.deletingIds.length);
                })
            },
            confirmDelete(ids = null) {
                if(ids === null) {
                    this.deletingSingle = false;
                    ids = this.selected;
                } else {
                    this.deletingSingle = true;
                }
                this.deletingIds.splice(0, this.deletingIds.length);
                for (let i = 0; i < ids.length; i++) {
                    this.deletingIds.push(ids[i]);
                }
                this.$refs.deleteConfirmPopup.showPopup();
            },
        },
        watch: {
            mainColumnIndex: function(newVal) {
                this.columns[newVal].isVisible = true;
                this.sorting = null
            }
        }
    }
</script>

<style scoped>

</style>
