import moment from "moment";
import { FaEdit, FaHamburger, FaMoneyCheck, FaPlus, FaTrash } from "react-icons/fa";
import { toRupiah } from "../middleware/utils";

export default function Item({ item, clickTrash }) {
  return (
    <div className='col-8 hover' style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
      {
        item.categoryId.icon === 'hamburger' ?
          <FaHamburger />
          :
          <FaMoneyCheck />
      }
      <div style={{ margin: '0px 16px', textAlign: 'left' }}>
        <h5 style={{ margin: 0, padding: 0 }}>{item.categoryId.name}</h5>
        <span style={{ fontSize: 12 }}>{item.note}</span>
        <p style={{ margin: 0, fontSize: 10 }}>{moment(item.dateAt).format('LLL')}</p>
      </div>
      <div>
        {/* <FaEdit className="my-1" /> */}
        <FaTrash className="my-1" onClick={e => clickTrash(item._id)} />
      </div>
      <span className={`text-${item.transactionType === 'Spending' ? 'red' : 'green'}`} style={{ marginLeft: 'auto' }}>
        {
          item.transactionType === 'Spending' ? `-${toRupiah(item.amount, 'Rp')}` : `+${toRupiah(item.amount, 'Rp')}`
        }
      </span>
    </div>
  )
}