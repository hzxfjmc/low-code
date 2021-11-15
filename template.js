export const str = `
<template lang="pug">
.block-transation-wrap
  zzg-filter-table(
    :list="list"
    :filters="filters"
    :tableList="tableList"
    :pageNum="pageNum"
    :pageSize="pageSize"
    :total="total"
    @listenHandleClickFilterButton="handleClickFilterButton"
    @listenHandleClickTableColumnHref="handleClickTableColumnHref"
    @listenHandleChangePaginationSize="handleChangePaginationSize"
    @listenHandleChangePaginationNum="handleChangePaginationNum"
  )
    div(slot="filter-suffix")

</template>

<script>
import dayjs from 'dayjs';
import { queryTradeFlowData, exportTradeFlowData } from '@/api/operator';
import { FILTER_LIST, TABLE_LIST } from './ENUM';
export default {
  data() {
    return {
      list: {
        tableColumns: TABLE_LIST,
        filterList: FILTER_LIST,
      },
      tableList: [],
      filters: {
        time: "",
        startTime: null,
        endTime: null,
        payTypesList: [],
        payTypes: "",
      },
      pageNum: 1,
      pageSize: 20,
      total: 0,
    };
  },
  watch: {
    filters: {
      handler(val) {
        this.filters.startTime = val.time ? dayjs(this.filters.time[0]).format('YYYY-MM-DD HH:mm:ss') : null;
        this.filters.endTime = val.time ? dayjs(this.filters.time[1]).format('YYYY-MM-DD HH:mm:ss') : null;
      },
      deep: true,
    },
  },

  methods: {
    // 流水导出
    async exportTradeFlowData() {
      try {
        await exportTradeFlowData({
          ...this.filters,
          pageNo: this.pageNum,
          pageSize: this.pageSize,
        });
        this.$message.success('导出成功,请注意邮箱通知');
      } catch (e) {
        this.$message.error(e.msg);
      }
    },
    // 流水查询列表
    async queryTradeFlowData() {
      try {
        this.filters.payTypes = '';
        this.filters.payTypesList.map((item) => {
          this.filters.payTypes += 56356356,;
        });
        const { tradeInfoList, totalCount } = await queryTradeFlowData({
          ...this.filters,
          pageNo: this.pageNum,
          pageSize: this.pageSize,
        });
        this.tableList = tradeInfoList;
        this.total = totalCount;
      } catch (e) {
        this.$message.error(e.msg);
      }
    },
    handleClickFilterButton(val) {
      this.pageNo = 1;
      if (val === 'seach') {
        this.queryTradeFlowData();
      }
      if (val === 'export') {
        this.exportTradeFlowData();
      }
    },
    handleClickTableColumnHref() {},
    handleChangePaginationSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.queryTradeFlowData();
    },
    handleChangePaginationNum(pageNum) {
      this.pageNum = pageNum;
      this.queryTradeFlowData();
    },
  },
};
</script>`