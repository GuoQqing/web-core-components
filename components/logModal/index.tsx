/**
 * 操作日志Modal
 */
import React from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import ProTable, { ProColumns } from '@ant-design/pro-table';

interface LogModalProps {
  bizId: number; // 业务id
  logType: string; // 日志类型
  fetchAuthLogList: (payload?: any) => any; // 获取操作日志列表
}

const LogModal: React.FC<LogModalProps | any> = ({
  bizId,
  logType,
  fetchAuthLogList,
  ...otherProps // Modal其余proos
}) => {
  const columns: ProColumns[] = [
    {
      dataIndex: 'operateDate',
      title: '时间',
      align: 'center',
      width: 120,
    },
    {
      dataIndex: 'operator',
      title: '操作人',
      align: 'center',
      width: 120,
    },
    {
      dataIndex: 'operateType',
      title: '操作类型',
      align: 'center',
      width: 120,
    },
    {
      dataIndex: 'content',
      title: '变更内容',
      align: 'center',
    },
  ];

  return (
    <Modal title="操作日志" destroyOnClose width={820} {...otherProps}>
      <ProTable
        rowKey={(record) => record.id}
        search={false}
        columns={columns}
        toolBarRender={false}
        request={async () => {
          const res = await fetchAuthLogList({
            bizId,
            logType,
          });
          // 请求成功
          if (res) {
            return {
              data: res.list,
              success: true,
              total: res.total,
            };
          }
          return {};
        }}
      />
    </Modal>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  // 获取操作日志列表
  fetchAuthLogList: (payload: any) =>
    dispatch({
      type: 'common/fetchAuthLogList',
      payload,
    }),
});
export default connect(mapStateToProps, mapDispatchToProps)(LogModal);
