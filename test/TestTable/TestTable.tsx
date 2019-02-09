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
        </div>
        <div style={{ height: null }}>
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
          />
        </div>
      </Container>
    );
  }
}

export default TestTable;
