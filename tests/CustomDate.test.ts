// import {ValideDate} from "../src/services/ValideDate";
//
// describe('ValideDate', ()=>{
//   describe('valideHour', ()=>{
//     test('Test valideHour return error', ()=>{
//       expect.assertions(2)
//       try{
//         const date = new ValideDate('segunda', '07h', '09h')
//         date.valideHour()
//       }catch (err){
//         expect(err.statusCode).toBe(400)
//         expect(err.message).toBe('Start hour incorrect')
//       }
//     })
//
//     test('Test valideHour return error', ()=> {
//       expect.assertions(2)
//       try {
//         const date = new ValideDate('segunda', '09h', '24h')
//         date.valideHour()
//       } catch (err) {
//         expect(err.statusCode).toBe(400)
//         expect(err.message).toBe('End hour incorrect')
//       }
//     })
//
//     test('Test valideHour return error', ()=> {
//       expect.assertions(2)
//       try {
//         const date = new ValideDate('segunda', '09h', '08h')
//         date.valideHour()
//       } catch (err) {
//         expect(err.statusCode).toBe(400)
//         expect(err.message).toBe('Start hour cannot be greater than end hour')
//       }
//     })
//
//     test('Test valideHour return number[]', ()=>{
//       const date = new ValideDate('segunda', '12h', '13h')
//       expect(date.valideHour()).toEqual([12,13])
//     })
//   })
//
//   describe('valideDay', ()=>{
//     test('Day invalid',()=>{
//       expect.assertions(1)
//       try{
//         const date = new ValideDate('segunda', '','')
//         date.valideDay()
//       }catch (err){
//         expect(err.message).toBe('Day invalid')
//       }
//     })
//     test('Day valid',()=>{
//       const date = new ValideDate('sábado', '','')
//       expect(date.valideDay()).toBe('sábado')
//     })
//   })
// })
//
// import {ValideDate} from "../src/services/ValideDate";
//
// describe('Test ValideDate',()=>{
//   test('Successful',()=>{
//     const date = new ValideDate('sábado', '09h','10h')
//     expect(date.valideDate()).toEqual({
//       day:'sábado',end_time:10,start_time:9
//     })
//   })
// })