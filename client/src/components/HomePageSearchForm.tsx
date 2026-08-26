import Select from "react-select";
import arrowDownIcon from "../assets/imgs/template/icons/arrow-down.svg";

const industryOptions = [
  { value: "1", label: "Software" },
  { value: "2", label: "Finance" },
  { value: "3", label: "Recruiting" },
  { value: "4", label: "Management" },
  { value: "5", label: "Advertising" },
  { value: "6", label: "Development" },
];

const locationOptions = [
  { value: "AX", label: "Aland Islands" },
  { value: "AF", label: "Afghanistan" },
  { value: "AL", label: "Albania" },
  { value: "DZ", label: "Algeria" },
  { value: "AD", label: "Andorra" },
  { value: "AO", label: "Angola" },
  { value: "AI", label: "Anguilla" },
  { value: "AQ", label: "Antarctica" },
  { value: "AG", label: "Antigua and Barbuda" },
  { value: "AR", label: "Argentina" },
  { value: "AM", label: "Armenia" },
  { value: "AW", label: "Aruba" },
  { value: "AU", label: "Australia" },
  { value: "AT", label: "Austria" },
  { value: "AZ", label: "Azerbaijan" },
  { value: "BS", label: "Bahamas" },
  { value: "BH", label: "Bahrain" },
  { value: "BD", label: "Bangladesh" },
  { value: "BB", label: "Barbados" },
  { value: "BY", label: "Belarus" },
  { value: "PW", label: "Belau" },
  { value: "BE", label: "Belgium" },
  { value: "BZ", label: "Belize" },
  { value: "BJ", label: "Benin" },
  { value: "BM", label: "Bermuda" },
  { value: "BT", label: "Bhutan" },
  { value: "BO", label: "Bolivia" },
  { value: "BA", label: "Bosnia and Herzegovina" },
  { value: "BW", label: "Botswana" },
  { value: "BR", label: "Brazil" },
  { value: "BN", label: "Brunei" },
  { value: "BG", label: "Bulgaria" },
  { value: "BF", label: "Burkina Faso" },
  { value: "BI", label: "Burundi" },
  { value: "KH", label: "Cambodia" },
  { value: "CM", label: "Cameroon" },
  { value: "CA", label: "Canada" },
  { value: "CV", label: "Cape Verde" },
  { value: "CL", label: "Chile" },
  { value: "CN", label: "China" },
  { value: "CO", label: "Colombia" },
  { value: "CR", label: "Costa Rica" },
  { value: "HR", label: "Croatia" },
  { value: "CU", label: "Cuba" },
  { value: "CY", label: "Cyprus" },
  { value: "CZ", label: "Czech Republic" },
  { value: "DK", label: "Denmark" },
  { value: "EG", label: "Egypt" },
  { value: "FI", label: "Finland" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
  { value: "GH", label: "Ghana" },
  { value: "GR", label: "Greece" },
  { value: "HU", label: "Hungary" },
  { value: "IS", label: "Iceland" },
  { value: "IN", label: "India" },
  { value: "ID", label: "Indonesia" },
  { value: "IR", label: "Iran" },
  { value: "IQ", label: "Iraq" },
  { value: "IE", label: "Republic of Ireland" },
  { value: "IT", label: "Italy" },
  { value: "JP", label: "Japan" },
  { value: "KE", label: "Kenya" },
  { value: "MY", label: "Malaysia" },
  { value: "MV", label: "Maldives" },
  { value: "MX", label: "Mexico" },
  { value: "NP", label: "Nepal" },
  { value: "NL", label: "Netherlands" },
  { value: "NZ", label: "New Zealand" },
  { value: "NG", label: "Nigeria" },
  { value: "NO", label: "Norway" },
  { value: "PK", label: "Pakistan" },
  { value: "PH", label: "Philippines" },
  { value: "PL", label: "Poland" },
  { value: "PT", label: "Portugal" },
  { value: "QA", label: "Qatar" },
  { value: "RU", label: "Russia" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "SG", label: "Singapore" },
  { value: "ZA", label: "South Africa" },
  { value: "KR", label: "South Korea" },
  { value: "ES", label: "Spain" },
  { value: "LK", label: "Sri Lanka" },
  { value: "SE", label: "Sweden" },
  { value: "CH", label: "Switzerland" },
  { value: "TW", label: "Taiwan" },
  { value: "TH", label: "Thailand" },
  { value: "TR", label: "Turkey" },
  { value: "UA", label: "Ukraine" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "GB", label: "United Kingdom (UK)" },
  { value: "US", label: "USA (US)" },
  { value: "UZ", label: "Uzbekistan" },
  { value: "VN", label: "Vietnam" },
];

const CustomDropdownIndicator = (props: any) => {
  return (
    <div {...props.innerProps} style={{ padding: '0 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', height: '28px' }}>
      <img src={arrowDownIcon} alt="" style={{ width: 12 }} />
    </div>
  );
};

const customStyles = {
  control: (base: any) => ({
    ...base,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    minHeight: '28px',
    height: '28px',
    cursor: 'pointer',
    padding: 0,
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: '0 0px 0 5px',
    height: '28px',
    minHeight: '28px',
    margin: 0,
  }),
  input: (base: any) => ({
    ...base,
    margin: 0,
    padding: 0,
    height: '28px',
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    height: '28px',
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: '0 8px',
    color: '#a0aec0',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#4f5e64',
    fontSize: '15px',
    fontWeight: 500,
    margin: 0,
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#05264e',
    fontSize: '15px',
    fontWeight: 500,
    margin: 0,
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: '8px',
    boxShadow: '0px 18px 40px rgba(5, 38, 78, 0.08)',
    border: 'none',
    marginTop: '15px',
    zIndex: 100,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? '#f2f6fd' : 'white',
    color: state.isSelected ? '#3c65f5' : '#4f5e64',
    cursor: 'pointer',
    padding: '10px 20px',
    fontSize: '15px',
    fontWeight: 500,
  }),
};

const HomePageSearchForm = () => {
  return (
    <form className="job-search-form">
      {/* Industry */}
      <div className="box-industry">
        <Select
          options={industryOptions}
          isSearchable
          placeholder="Industry"
          className="select2"
          classNamePrefix="industry"
          styles={customStyles}
          components={{ DropdownIndicator: CustomDropdownIndicator }}
        />
      </div>

      {/* Location */}
      <Select
        options={locationOptions}
        isSearchable
        placeholder="Location"
        className="select2"
        classNamePrefix="location"
        styles={customStyles}
        components={{ DropdownIndicator: CustomDropdownIndicator }}
      />

      {/* Keyword */}
      <input
        className="form-input input-keysearch"
        type="text"
        placeholder="Your keyword..."
      />

      {/* Search */}
      <button type="submit" className="btn btn-default btn-find font-sm">
        Search
      </button>
    </form>
  );
};

export default HomePageSearchForm;
