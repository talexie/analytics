export const getMonthlyDate =(startDate,calendar='ethiopic')=>{
    const d = new Date(startDate);
    let result = `${d.toLocaleString('en',{
        calendar: calendar,
        month: 'long'
      })} - ${
        d.toLocaleString('en',{
          calendar: calendar,
          year: 'numeric'
        })}`;
    result = result.replace(/ERA\d+\s*/g, '').trim()
    return result;
}


export const convertGregoryToEthDate = (period,calendar='ethiopic')=>{
    if(new Date(period?.startDate).getMonth() === 8){
        return [
            {
                ...period,
                name: getMonthlyDate(`${new Date(period?.startDate).getFullYear()}-09-09`,calendar),
                isoname: period?.name,
            },
            {
                ...period,
                name: getMonthlyDate(period?.endDate,calendar),
                isoname: period?.name
            }
        ]
    }
    return ({
      ...period,
      name: getMonthlyDate(period?.startDate,calendar),
      isoname: period?.name
    })

}

export const convertNavigatorYear =(year,calendar='ethiopic')=>{
    const navYear = new Date(`${year}-01-01`);
    let result = navYear?.toLocaleString('en',{
        calendar: calendar,
        year: 'numeric'
    });
    result = result?.replace(/ERA\d+\s*/g, '')?.trim()
    return result;
}
export const convertGregoryToOther =(periods,periodType,calendar='ethiopic')=>{
    if(calendar ==='ethiopian' || calendar=='ethiopic'){
        return periods?.map((period)=>{
            if(periodType ==='MONTHLY'){
                return  convertGregoryToEthDate(period,calendar)
            }
            return ({
                ...period,
                name: period?.name,
                isoname: period?.name
            })
            
        }).flatMap((pe)=>pe)
    }
    return periods;

}
