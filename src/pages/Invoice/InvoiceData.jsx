import React, { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import './Invoice2b.css'
import { FacebookShareButton } from 'react-share'
import { WhatsappShareButton } from 'react-share'
import { EmailShareButton } from 'react-share'
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

/**
 * This component handles the display of the invoice itself for
 * printing or downloading, it showsup in a different Page.
 * 
 */

const InvoiceData = () => {
  // state variables for invoice data and loading status
  const [invoiceDatas, setInvoiceDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sentOutInvCount, setSentOutInvCount] = useState(1)
  const [subTotal, setSubTotal] = useState(0)
  const [vatTotal, setVATTotal] = useState(0)

  const axiosPrivate = useAxiosPrivate()

  let { id } = useParams()

  const shareUrl = `http://localhost:3500/newInvoice/${id}`

  //retrieve invoice data from the database and set it to state
  useEffect(() => {
    axiosPrivate.get(`/newInvoice/${id}`).then((response) => {
      setInvoiceDatas(response.data)
      setLoading(false);
    }).catch((error) => console.log(error))
    setLoading(false);
  }, [])


  //invoice sharing feature, counts the number of shares clicks
  const handleShareClick = () => {
    setSentOutInvCount(sentOutInvCount + 1)
    axiosPrivate.post(`/newInvoice/${id}`, { sentOutInvCount }).then((response) => {
    }).catch((error) => console.log(error))
  }

  const totalPriceCountArr = invoiceDatas ? invoiceDatas.newInvoiceItemm.map((item => { return Number(item.totalPriceCount) })) : null
  const subTotalObj = totalPriceCountArr ? totalPriceCountArr.reduce((total, balance) => total + balance, 0) : null

  const vatTaxValueArr = invoiceDatas ? invoiceDatas.newInvoiceItemm.map((item => { return Number(item.vaTaxValue) })) : null
  const vatTotalObj = vatTaxValueArr ? vatTaxValueArr.reduce((total, balance) => total + balance, 0) : null

  useEffect(() => {
    setSubTotal(subTotalObj)
  }, [subTotalObj])

  useEffect(() => {
    setVATTotal(vatTotalObj)
  }, [vatTotalObj])

  return (
    <div>
      {loading ? (<p>is Loading...</p>) : invoiceDatas ? (
        <div class="py-4">
          <div class="px-14 py-6">
            <table class="w-full border-collapse border-spacing-0">
              <tbody>
                <tr>
                  <td class="w-full align-top">
                    <div>
                      <FacebookShareButton url={shareUrl} style={{ marginRight: 10 }}
                        onClick={handleShareClick}>
                        Share on:  <span style={{ color: '#3b5998' }}>Facebook</span>
                      </FacebookShareButton>
                      |
                      <WhatsappShareButton url={shareUrl} style={{ marginRight: 10, marginLeft: 10 }}
                        onClick={handleShareClick}>
                        <span style={{ color: '#25D366' }}>WhatsApp</span>
                      </WhatsappShareButton>
                      |
                      <EmailShareButton url={shareUrl} style={{ marginLeft: 10 }}
                        onClick={handleShareClick}>
                        <span style={{ color: '#c71610' }}>Email</span>
                      </EmailShareButton>
                      <img src="https://raw.githubusercontent.com/templid/email-templates/main/templid-dynamic-templates/invoice-02/brand-sample.png" class="h-12" />
                    </div>
                  </td>

                  <td class="align-top">
                    <div class="text-sm">
                      <table class="border-collapse border-spacing-0">
                        <tbody>
                          <tr>
                            <td class="border-r pr-4">
                              <div>
                                <p class="whitespace-nowrap text-slate-400 text-right">Date</p>
                                <p class="whitespace-nowrap font-bold text-main text-right">{dayjs(invoiceDatas.invoiceDate).format('DD MMMM YYYY')}</p>
                              </div>
                            </td>
                            <td class="pl-4">
                              <div>
                                <p class="whitespace-nowrap text-slate-400 text-right">Invoice #</p>
                                <p class="whitespace-nowrap font-bold text-main text-right">BRA-00335</p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-slate-100 px-14 py-6 text-sm">
            <table class="w-full border-collapse border-spacing-0">
              <tbody>
                <tr>
                  <td class="w-1/2 align-top">
                    <div class="text-sm text-neutral-600">
                      <p class="font-bold">Supplier Company INC</p>
                      <p>Number: 23456789</p>
                      <p>VAT: 23456789</p>
                      <p>6622 Abshire Mills</p>
                      <p>Port Orlofurt, 05820</p>
                      <p>United States</p>
                    </div>
                  </td>
                  <td class="w-1/2 align-top text-right">
                    <div class="text-sm text-neutral-600">
                      <p class="font-bold">Name: {invoiceDatas.currentCustomer.customerName}</p>
                      <p>Number: {invoiceDatas.currentCustomer.customerPhoneNumber}</p>
                      <p>{invoiceDatas.currentCustomer.customerAddress}</p>
                      <p>{invoiceDatas.currentCustomer.customerState}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="px-14 py-10 text-sm text-neutral-700">
            <table class="w-full border-collapse border-spacing-0">
              <thead>
                <tr>
                  <td class="border-b-2 border-main pb-3 pl-3 font-bold text-main">#</td>
                  <td class="border-b-2 border-main pb-3 pl-2 font-bold text-main">Product details</td>
                  <td class="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">Price</td>
                  <td class="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">Qty.</td>
                  <td class="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">VAT in %</td>
                  <td class="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">Subtotal</td>
                  <td class="border-b-2 border-main pb-3 pl-2 pr-3 text-right font-bold text-main">Subtotal + VAT</td>
                </tr>
              </thead>
              <tbody>
                {invoiceDatas.newInvoiceItemm.map((items, index) => {
                  const { productName, sellingPrice, vaTaxPercent, vaTaxValue, totalPriceCount, quantity } = items;
                  return (
                    <tr>
                      <td class="border-b py-3 pl-3">{index + 1}.</td>
                      <td class="border-b py-3 pl-2">{productName}</td>
                      <td class="border-b py-3 pl-2 text-right">N{sellingPrice.toLocaleString()}</td>
                      <td class="border-b py-3 pl-2 text-center">{quantity}</td>
                      <td class="border-b py-3 pl-2 text-center">{vaTaxPercent}</td>
                      <td class="border-b py-3 pl-2 text-right">N{totalPriceCount.toLocaleString()}.00</td>
                      <td class="border-b py-3 pl-2 pr-3 text-right">N{(totalPriceCount + vaTaxValue).toLocaleString()}</td>
                    </tr>
                  );
                })}

                <tr>
                  <td colspan="7">
                    <table class="w-full border-collapse border-spacing-0">
                      <tbody>
                        <tr>
                          <td class="w-full"></td>
                          <td>
                            <table class="w-full border-collapse border-spacing-0">
                              <tbody>
                                <tr>
                                  <td class="border-b p-3">
                                    <div class="whitespace-nowrap text-slate-400">Sub-total:</div>
                                  </td>
                                  <td class="border-b p-3 text-right">
                                    <div class="whitespace-nowrap font-bold text-main">N{subTotal ? subTotal.toLocaleString() : 0}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="p-3">
                                    <div class="whitespace-nowrap text-slate-400">VAT total:</div>
                                  </td>
                                  <td class="p-3 text-right">
                                    <div class="whitespace-nowrap font-bold text-main">N{vatTotal ? vatTotal.toLocaleString() : 0}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="bg-main p-3">
                                    <div class="whitespace-nowrap font-bold text-white">Total:</div>
                                  </td>
                                  <td class="bg-main p-3 text-right">
                                    <div class="whitespace-nowrap font-bold text-white">N{(subTotal + vatTotal) ? (subTotal + vatTotal).toLocaleString() : 0}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="px-14 text-sm text-neutral-700">
            <p class="text-main font-bold">PAYMENT DETAILS</p>
            <p>Banks of Banks</p>
            <p>Bank/Sort Code: 1234567</p>
            <p>Account Number: 123456678</p>
            <p>Payment Reference: BRA-00335</p>
          </div>

          <div class="px-14 py-10 text-sm text-neutral-700">
            <p class="text-main font-bold">Notes</p>
            <p class="italic">All Payments should be made on or before:</p>
            <p class="whitespace-nowrap font-bold text-main text-left">{dayjs(invoiceDatas.invoiceDueDate).format('DD MMMM YYYY')}</p>
          </div>

          <footer class="fixed bottom-0 left-0 bg-slate-100 w-full text-neutral-600 text-center text-xs py-3">
            Supplier Company
            <span class="text-slate-300 px-2">|</span>
            info@company.com
            <span class="text-slate-300 px-2">|</span>
            +1-202-555-0106
          </footer>
        </div>
      ) : (<p>No Records Found</p>)
      }
    </div>


  );

};

export default InvoiceData;