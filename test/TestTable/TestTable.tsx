import * as React from 'react';
import Container from '../Container';
import {
  dailyBasicDataSource, dailyBasicKeyNames, dailyBasicKeys,
} from './raw';
import Table from '../../src/Table';
import Switch from '../../src/Switch';

class TestTable extends React.PureComponent {
  private readonly columns = dailyBasicKeys.map(key => ({
    key,
    title: dailyBasicKeyNames[key],
  }));

  state = {
    loading: false,
    page: null,
    height: null,
  };

  render() {
    return (
      <Container title="Table">
        <div className="p-2 d-flex align-items-center">
          <div>Loading</div>
          <Switch
            className="ml-1"
            value={this.state.loading}
            onChange={loading => this.setState({ loading })}
          />

          <div className="ml-2">Pagination</div>
          <Switch
            className="ml-1"
            value={this.state.page != null}
            onChange={() => {
              if (this.state.page == null) {
                this.setState({ page: 1 });
              } else {
                this.setState({ page: null });
              }
            }}
          />

          <div className="ml-2">Fixed height</div>
          <Switch
            className="ml-1"
            value={this.state.height != null}
            onChange={() => {
              if (this.state.height == null) {
                this.setState({ height: 300 });
              } else {
                this.setState({ height: null });
              }
            }}
          />
        </div>
        <div style={{ height: this.state.height }}>
          <Table
            columns={this.columns}
            dataSource={dailyBasicDataSource}
            noWrap
            loading={this.state.loading}
            pagination={this.state.page && {
              page: this.state.page,
              onChange: (page) => {
                this.setState({ page });
              },
              rowsPerPage: 10,
            }}
            height={this.state.height == null ? null : 'flex'}
          />
        </div>
      </Container>
    );
  }
}

export default TestTable;
