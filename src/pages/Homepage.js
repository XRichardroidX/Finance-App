import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BsSearch, BsChevronLeft, BsMic, BsGear,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Company from '../components/Company';
import { fetchCompaniesData } from '../redux/companies/companiesSlice';
import Header from '../components/Header';
import '../styles/companies.css';

const Companies = () => {
  const { companiesArr, loading } = useSelector((state) => state.companies);

  const shouldFetchCompaniesData = useRef(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (shouldFetchCompaniesData.current) {
      shouldFetchCompaniesData.current = false;

      dispatch(fetchCompaniesData());
    }
  }, []);

  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="companies-homepage">
      <Header />
      {loading ? (
        <div className="loading">
          <h2 className="loading">Loading...</h2>
        </div>
      ) : (
        <div className="search-companiess">
          <div className="header">
            <Link to="/" className="back">
              <BsChevronLeft className="nav-icons" />
              2015
            </Link>
            <div className="search">
              <div className="input-icon">
                <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search Company"
                  className="search-input"
                />
                <BsSearch className="search-icon" />
              </div>
            </div>
            <div className="nav-icons-right">
              <BsMic className="nav-icons" />
              <BsGear className="nav-icons" />
            </div>
          </div>
          <div className="display-companies">
            <h1 className="companies-h1">Companies</h1>
            <div className="companies">
              {companiesArr
                .filter((company) => {
                  if (search === '') {
                    return company;
                  }
                  if (
                    company.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return company;
                  }
                  return null;
                })
                .map((company) => (
                  <Company
                    key={company.symbol}
                    companySymbol={company.symbol}
                    companyName={company.name}
                    companyHeadquarter={company.headQuarter}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;
