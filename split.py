import urlparse
url = "http://www.translink.co.uk/Templates/Translink/Util/Services/MdvJourneyPlannerWidgetDepartureHandler.ashx?language=en&itdLPxx_depOnly=1&limit=8&dmMacroNIR=true&maxAssignedStops=1&includedMeans=checkbox&name_dm=10011918&commonMacroNIR=true&inclMOT_0=1&motBusMacroNIR=true&itdTimeHour=15&itdTimeMinute=09&itdDate=20160401&_=1459519733538"
parse_object = urlparse(url)
print parse_object
