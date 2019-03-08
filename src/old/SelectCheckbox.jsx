import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SelectField, Button, ListItemControl, Checkbox, TextField } from 'react-md';

import './SelectCheckbox.scss';

// import { sort } from '~/lib/util/react';

function bodyClick() {
  function noop() {}
  const body = document.getElementsByTagName('body')[0];
  body.addEventListener('click', noop);
  body.click();
  body.removeEventListener('click', noop);
}

const styles = {
  container: {
    display: 'inline-block',
    marginRight: 20,
    marginBottom: 12,
  },
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 16,
  },
};


class SelectCheckbox extends Component {
  constructor(props) {
    super(props);

    let selectedItems = [];

    if (props.values) {
      selectedItems = props.items.filter(
        i => props.values.indexOf(typeof i === 'object' ? i[props.itemValue] : i) > -1,
      );
    }

    this.state = {
      items: props.items.slice(),
      selectedItems,
      allChecked: false,
      clearAll: false,
    };

    this.search = this.search.bind(this);
    this.onToggleItem = this.onToggleItem.bind(this);
    this.apply = this.apply.bind(this);
    this.checkUncheckAll = this.checkUncheckAll.bind(this);
    this.clearAllValues = this.clearAllValues.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items || nextProps.values !== this.props.values) {
      const items = nextProps.items.slice();
      const values = nextProps.values === undefined ? [] : nextProps.values;
      /* if (nextProps.sortBy) {
        items = sort(items, nextProps.sortBy);
      } */

      this.setState(({ selectedItems }) => ({
        items,
        selectedItems:
          values === undefined
            ? selectedItems
            : items.filter(i => values.indexOf(typeof i === 'object' ? i[nextProps.itemValue] : i) > -1),
      }));
    }
  }

  onToggleItem({ index, checked, e }) {
    e.stopPropagation();
    e.preventDefault();
    const {
      items,
      selectedItems,
    } = this.state;

    const item = items[index];
    const cloneSelected = selectedItems.slice();

    if (checked) {
      cloneSelected.push(item);
    } else {
      const indexSelected = cloneSelected.indexOf(item);
      cloneSelected.splice(indexSelected, 1);
    }


    this.setState({
      selectedItems: cloneSelected,
    });

    this.props.onToggleItem(item, cloneSelected);
  }

  checkUncheckAll() {
    const { items, selectedItems } = this.state;

    const allChecked = selectedItems.length === items.length;

    if (allChecked) {
      this.setState(
        {
          selectedItems: [],
          allChecked: false,
        },
        () => {
          this.props.onToggleItem(null, []);
        },
      );
    } else {
      this.setState(
        {
          selectedItems: items.slice(),
          allChecked: true,
        },
        () => {
          this.props.onToggleItem(null, items);
        },
      );
    }
  }

  clearAllValues() {
    const { items, selectedItems } = this.state;

    // const clearAll = selectedItems.length === items.length;

    const clearAll = selectedItems.length > 0;

    // console.log('clear all', clearAll);

    if (clearAll) {
      this.setState(
        {
          selectedItems: [],
          clearAll: false,
        },
        () => {
          this.props.onToggleItem(null, []);
        },
      );
    } /* else {
      this.setState(
        {
          selectedItems: items.slice(),
          clearAll: true,
        },
        () => {
          this.props.onToggleItem(null, items);
        },
      );
    } */
  }


  apply() {
    const {
      selectedItems,
    } = this.state;
    this.props.onApply({ items: selectedItems });
    bodyClick();
  }


  search(value) {
    const {
      search,
      items,
    } = this.props;

    let found = [];
    if (search) {
      found = search(items);
    } else {
      const regex = new RegExp(value, 'ig');
      found = items.filter(i => regex.test(JSON.stringify(i)));
      this.setState({
        items: found,
      });
    }
  }

  renderSelectedLabel() {
    const {
      selectedItems,
    } = this.state;

    const {
      itemSelectedLabelRenderer,
      label,
      nullLabel,
    } = this.props;

    if (!selectedItems.length) return nullLabel;

    const renderer =
      itemSelectedLabelRenderer ||
      (items => items.map(item => this.renderLabel(item)).join(', '));

    return renderer(selectedItems);
  }


  renderLabel(item) {
    const {
      itemLabel,
      itemLabelRenderer,
    } = this.props;


    if (itemLabelRenderer) return itemLabelRenderer({ item });
    if (itemLabel) return item[itemLabel];
    if (!itemLabel) return item;
    return item;
  }

  renderSecondaryLabel(item) {
    const {
      itemSecondaryLabel,
      itemSecondaryLabelRenderer,
    } = this.props;

    if (itemSecondaryLabelRenderer) return itemSecondaryLabelRenderer({ item });
    if (itemSecondaryLabel) return item[itemSecondaryLabel];
    return undefined;
  }

  render() {
    const {
      items,
      selectedItems,
    } = this.state;

    const {
      className,
      itemValue,
      label,
      width,
      title,
      confirm,
      values,
      checkAll,
      clearAll,
      listStyle,
    } = this.props;

    function isSelected(item) {
      if (typeof item === 'object' && itemValue) {
        return selectedItems.some(i => i[itemValue] === item[itemValue]);
      }
      return selectedItems.some(i => i === item);
    }

    const searchItem = (
      <ListItemControl
      // rightIcon={chat}
        primaryAction={(
          <div style={styles.itemContainer}>
            <TextField
              placeholder="Pesquisar..."
              onChange={this.search}
            />
          </div>
        )}
      />
    );

    const isAllChecked = selectedItems.length === items.length;
    const isChecked = selectedItems.length > 0;


    const checkUncheckAllItem = checkAll ? (
      <ListItemControl
        // className="list"
        // rightIcon={chat}
        primaryAction={
          <div style={styles.itemContainer}>
            {}
            <Button
              className="SelectCheckBox-button"
              style={isAllChecked ? { display: 'none' } : {}}
              flat
              primary
              label={'Marcar todos'}
              iconChildren={'done_all'}
              onClick={this.checkUncheckAll}
            />

            <Button
              className="SelectCheckBox-button"
              style={!isChecked ? { display: 'none' } : {}}
              flat
              primary
              label={'Limpar Filtro'
              }
              iconChildren={'close'}
              onClick={this.clearAllValues}
            />

          </div>
        }
      />
    ) : null;

    const clearAllItem = clearAll ? (
      <ListItemControl
        // className="list"
        // rightIcon={chat}
        primaryAction={
          <div style={styles.itemContainer}>
            <Button
              flat
              primary
              label={'Limpar Filtro'
              }
              iconChildren={
                selectedItems.length === items.length ? 'close' : 'done'
              }
              onClick={this.clearAllValues}
            />
          </div>
        }
      />
    ) : null;


    const menuItems = items.map((item, index) => (
      <ListItemControl
        primaryAction={(
          <Checkbox
            id={`list-control-${index}`}
            label={this.renderLabel(item)}
            // className="SelectCheckbox-Item"
            onChange={(checked, e) => this.onToggleItem({ index, checked, e })}
            checked={isSelected(item)}
          />
        )}
        secondaryText={this.renderSecondaryLabel(item)}
      />
    ));

    const applyItem = confirm ? (
      <ListItemControl
      // rightIcon={chat}
        primaryAction={(
          <div style={styles.itemContainer}>
            <Button
              flat
              label="Aplicar"
              iconChildren="done"
              onClick={this.apply}
            />
          </div>
        )}
      />
    ) : null;

    const labelHiddenItem = (
      {
        label: this.renderSelectedLabel(),
        id: -1,
        className: 'SelectCheckbox-hidden-label',
      }
    );

    const allMenuItems = [searchItem]
      .concat(checkUncheckAllItem ? [checkUncheckAllItem] : [])
    //  .concat(clearAllItem ? [clearAllItem] : [])
      .concat(menuItems)
      .concat(applyItem ? [applyItem] : [])
      .concat(labelHiddenItem);

    const quantidadeLinhas = menuItems.length + (clearAllItem ? 1 : 0);
    let top = quantidadeLinhas * 48;
    top = top > listStyle.maxHeight ? -(listStyle.maxHeight - 48 * 5) : -top;

    return (
      <SelectField
        {...this.props}
        raised
        listStyle={{ ...listStyle }}
        menuItems={allMenuItems}
        label={label}
        // className="SelectCheckbox md-cell--12"
        // listStyle={{ maxHeight: 500 }}
        title={title}
        onChange={value => console.log('value selected', value)}
        itemLabel="label"
        value={-1}
        itemValue="id"
      />
    );
  }
}

SelectCheckbox.propTypes = {
  onApply: PropTypes.func,
  items: PropTypes.array,
  itemLabel: PropTypes.string,
  itemSecondaryLabel: PropTypes.string,
  label: PropTypes.string,
  itemValue: PropTypes.string,
  search: PropTypes.func,
  itemSecondaryLabelRenderer: PropTypes.func,
  itemLabelRenderer: PropTypes.func,
  itemSelectedLabelRenderer: PropTypes.func,
  className: PropTypes.string,
  width: PropTypes.number,
  title: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.oneOf(PropTypes.number, PropTypes.string)),
  confirm: PropTypes.bool,
  checkAll: PropTypes.bool,
  clearAll: PropTypes.bool,
  onToggleItem: PropTypes.func,
  nullLabel: PropTypes.string,
  listStyle: PropTypes.object,
};

SelectCheckbox.defaultProps = {
  onApply: () => {},
  itemLabel: null,
  itemValue: null,
  search: null,
  label: null,
  itemLabelRenderer: null,
  items: [],
  values: undefined,
  className: undefined,
  itemSelectedLabelRenderer: null,
  confirm: false,
  width: null,
  title: null,
  sortBy: undefined,
  onToggleItem: undefined,
  checkAll: false,
  clearAll: false,
  nullLabel: '',
  listStyle: {
    maxHeight: 500,
  },
  style: {
    minWidth: 100,
  },
  fullWidth: true,
};

export default SelectCheckbox;
