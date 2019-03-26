import * as faker from 'faker';
import * as React from 'react';
import Image, { ImageMode } from '../src/Image';
import Switch from '../src/Switch';
import Table from '../src/Table';
import Container from './Container';

interface Employee {
  firstName: string;
  lastName: string;
  jobTitle: string;
  phone: string;
  email: string;
  avatar: string;
  company: string;
  country: string;
  state: string;
  street: string;
}

function genEmployees(): Employee[] {
  const emList = [] as Employee[];

  for (let i = 0; i < 100; i += 1) {
    emList.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      jobTitle: faker.name.jobTitle(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      company: faker.company.companyName(),
      country: faker.address.country(),
      state: faker.address.state(),
      street: faker.address.streetName(),
    });
  }

  return emList;
}

class TestTable extends React.PureComponent {
  state = {
    loading: false,
    page: null,
    height: null,
  };

  private readonly dataSource: Employee[] = null;

  constructor(props) {
    super(props);
    this.dataSource = genEmployees();
  }

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
            columns={[{
              key: 'firstName',
              title: 'First Name',
            }, {
              key: 'lastName',
              title: 'Last Name',
            }, {
              key: 'jobTitle',
              title: 'Job',
            }, {
              key: 'email',
              title: 'Email',
            }, {
              key: 'avatar',
              title: 'Avatar',
              render: record => (
                <Image
                  src={record.avatar}
                  mode={ImageMode.MODE_OUTER_CUT}
                  width={50}
                  height={50}
                  style={{ borderRadius: '100%' }}
                />
              ),
            }, {
              key: 'company',
              title: 'Company',
            }, {
              key: 'country',
              title: 'Country',
            }, {
              key: 'state',
              title: 'State',
            }, {
              key: 'street',
              title: 'Street',
            }]}
            dataSource={this.dataSource}
            noWrap
            isLoading={this.state.loading}
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
