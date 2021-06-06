import { createLocalVue, mount } from '@vue/test-utils';
import { i18n } from '@/test/i18n';
import VuePagination from '../../molecules/VuePagination/VuePagination.vue';
import { IComputedDataRowCell, IDataTableHeader } from './IDataTable';
import VueDataTable from './VueDataTable.vue';
import VueDataTableSearch from './VueDataTableSearch/VueDataTableSearch.vue';
import VueDataTableHeader from './VueDataTableHeader/VueDataTableHeader.vue';
import { dataTableDataFixture, dataTableHeaderFixture } from './DataTableFixtures';

const localVue = createLocalVue();

describe('VueDataTable.vue', () => {
  const header: IDataTableHeader = dataTableHeaderFixture;
  const data: any[] = dataTableDataFixture;

  test('renders component', () => {
    const wrapper = mount<any>(VueDataTable, {
      i18n,
      localVue,
      propsData: {
        header,
        data,
      },
    });

    expect(wrapper.findAllComponents(VueDataTableSearch)).toHaveLength(1);
    expect(wrapper.findAllComponents(VueDataTableHeader)).toHaveLength(1);
    expect(wrapper.findAll('.vueDataTableRow')).toHaveLength(5);
    expect(wrapper.findAllComponents(VuePagination)).toHaveLength(1);
  });

  test('renders component without search', () => {
    const wrapper = mount<any>(VueDataTable, {
      i18n,
      localVue,
      propsData: {
        header,
        data,
        showSearch: false,
      },
    });

    expect(wrapper.findAllComponents(VueDataTableSearch)).toHaveLength(0);
    expect(wrapper.findAllComponents(VueDataTableHeader)).toHaveLength(1);
    expect(wrapper.findAll('.vueDataTableRow')).toHaveLength(5);
    expect(wrapper.findAllComponents(VuePagination)).toHaveLength(1);
  });

  test('should filter data', async () => {
    const wrapper = mount<any>(VueDataTable, {
      i18n,
      localVue,
      propsData: {
        header,
        data,
      },
    });

    wrapper.vm.searchTerm = 'julia';
    await wrapper.vm.$nextTick();

    expect(wrapper.findAllComponents(VueDataTableSearch)).toHaveLength(1);
    expect(wrapper.findAllComponents(VueDataTableHeader)).toHaveLength(1);
    expect(wrapper.findAll('.vueDataTableRow')).toHaveLength(4);

    wrapper.vm.searchTerm = 'z';
    await wrapper.vm.$nextTick();

    expect(wrapper.findAllComponents(VueDataTableSearch)).toHaveLength(1);
    expect(wrapper.findAllComponents(VueDataTableHeader)).toHaveLength(1);
    expect(wrapper.findAll('.noResults')).toHaveLength(1);
    expect(wrapper.findAll('.vueDataTableRow')).toHaveLength(0);
  });

  test('should sort data', async () => {
    const wrapper = mount<any>(VueDataTable, {
      i18n,
      localVue,
      propsData: {
        header,
        data,
      },
    });

    wrapper.setProps({ sortKey: 'firstname' });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.sortedData[0].firstname).toBe('Julia');
    expect(wrapper.vm.sortedData[1].firstname).toBe('Julia');
    expect(wrapper.vm.sortedData[2].firstname).toBe('Julia');
    expect(wrapper.vm.sortedData[3].firstname).toBe('Julia');

    wrapper.setProps({ sortDirection: 'desc' });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.sortedData[0].firstname).toBe('Toni');
    expect(wrapper.vm.sortedData[1].firstname).toBe('Toni');
    expect(wrapper.vm.sortedData[2].firstname).toBe('Toni');
    expect(wrapper.vm.sortedData[3].firstname).toBe('Toni');
  });

  test('should change page', () => {
    const wrapper = mount<any>(VueDataTable, {
      i18n,
      localVue,
      propsData: {
        header,
        data,
      },
    });

    wrapper.vm.paginationClick(2);

    expect(wrapper.vm.currentPage).toBe(1);
  });

  test('should emit click', () => {
    const wrapper = mount<any>(VueDataTable, {
      i18n,
      localVue,
      propsData: {
        header,
        data,
      },
    });
    const cells: IComputedDataRowCell[] = [
      { key: 'id', value: 2, visible: false, slot: undefined, cssClass: null },
      { key: 'name', value: 'foo', visible: false, slot: undefined, cssClass: null },
    ];

    wrapper.vm.rowClick(cells);

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')[0][0]).toEqual({ id: 2, name: 'foo' });
  });

  test('should sort', () => {
    const wrapper = mount<any>(VueDataTable, {
      i18n,
      localVue,
      propsData: {
        header,
        data,
      },
    });

    expect(wrapper.vm.internalSortKey).toBe(null);
    expect(wrapper.vm.internalSortDirection).toBe('asc');

    wrapper.vm.columnClick({ sortKey: 'foo' });
    expect(wrapper.vm.internalSortKey).toBe('foo');
    expect(wrapper.vm.internalSortDirection).toBe('asc');

    wrapper.vm.columnClick({ sortKey: 'foo' });
    expect(wrapper.vm.internalSortKey).toBe('foo');
    expect(wrapper.vm.internalSortDirection).toBe('desc');

    wrapper.vm.columnClick({ sortKey: 'foo' });
    expect(wrapper.vm.internalSortKey).toBe(null);
    expect(wrapper.vm.internalSortDirection).toBe('asc');
  });

  test('should display all the data if maxRows is set less or equal 0', () => {
    const wrapper = mount<any>(VueDataTable, {
      i18n,
      localVue,
      propsData: {
        header,
        data,
        maxRows: -1,
      },
    });

    expect(wrapper.vm.displayData).toHaveLength(20);
    expect(wrapper.vm.maxPages).toBe(0);
  });

  test('should add custom css class', () => {
    const wrapper = mount<any>(VueDataTable, {
      i18n,
      localVue,
      propsData: {
        header,
        data,
        maxRows: 0,
      },
    });

    expect(wrapper.findAll('.ageColumn')).toHaveLength(21);
  });
});
