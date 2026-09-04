import CounterMaster from "../../models/CounterModel/CounterMastermodel.js";
import CounterDetails from "../../models/CounterModel/CounterDetailsmodel.js";

export type ICounterMaster = InstanceType<typeof CounterMaster>;
export type ICounterDetails = InstanceType<typeof CounterDetails>;

// =====================================================
// CREATE COUNTER / VISITOR
// =====================================================

export async function createCounterService(
  counterData: Partial<ICounterDetails>,
) {
  try {
    // =====================================
    // Is Mobile Validation
    // =====================================

    if (typeof counterData.isMobile !== "boolean") {
      throw new Error("IsMobile is required");
    }

    // =====================================
    // Date
    // =====================================

    const currentDate = counterData.dateAndTime
      ? new Date(counterData.dateAndTime)
      : new Date();

    if (isNaN(currentDate.getTime())) {
      throw new Error("Invalid date and time");
    }

    // =====================================
    // Create Counter Details
    // =====================================

    const counterDetails = new CounterDetails({
      ...counterData,
      dateAndTime: currentDate,

      ipAddress: counterData.ipAddress?.trim() || "",
      country: counterData.country?.trim() || "",
      countrycode: counterData.countrycode?.trim() || "",
      city: counterData.city?.trim() || "",
      zipcode: counterData.zipcode?.trim() || "",
      longitude: counterData.longitude?.trim() || "",
      latitude: counterData.latitude?.trim() || "",
      continent: counterData.continent?.trim() || "",
    });

    const savedDetails = await counterDetails.save();

    // =====================================
    // Get Start & End Of Today
    // =====================================

    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);

    // =====================================
    // Find Today's Counter
    // =====================================

    let counterMaster = await CounterMaster.findOne({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // =====================================
    // Create Today's Counter
    // =====================================

    if (!counterMaster) {
      counterMaster = new CounterMaster({
        countMobile: counterData.isMobile ? 1 : 0,
        countDesktop: counterData.isMobile ? 0 : 1,
        todayTotal: 1,
        date: currentDate,
      });

      await counterMaster.save();
    } else {
      // =====================================
      // Update Today's Counter
      // =====================================

      if (counterData.isMobile) {
        counterMaster.countMobile += 1;
      } else {
        counterMaster.countDesktop += 1;
      }

      counterMaster.todayTotal += 1;

      await counterMaster.save();
    }

    return {
      counterDetails: savedDetails,
      counterMaster,
    };
  } catch (error) {
    console.error("Error creating counter:", error);
    throw error;
  }
}

// =====================================================
// GET COUNTER MASTER
// =====================================================

export async function getCounterService() {
  try {
    return await CounterMaster.find().sort({
      date: -1,
    });
  } catch (error) {
    console.error("Error getting counter:", error);
    throw error;
  }
}

// =====================================================
// GET COUNTER MASTER BY ID
// =====================================================

export async function getCounterByIdService(id: string) {
  try {
    return await CounterMaster.findById(id);
  } catch (error) {
    console.error(`Error getting counter with id ${id}:`, error);
    throw error;
  }
}

// =====================================================
// GET COUNTER DETAILS
// =====================================================

export async function getCounterDetailsService() {
  try {
    return await CounterDetails.find().sort({
      dateAndTime: -1,
    });
  } catch (error) {
    console.error("Error getting counter details:", error);
    throw error;
  }
}

// =====================================================
// GET COUNTER DETAILS BY ID
// =====================================================

export async function getCounterDetailsByIdService(id: string) {
  try {
    return await CounterDetails.findById(id);
  } catch (error) {
    console.error(`Error getting counter details with id ${id}:`, error);
    throw error;
  }
}

// =====================================================
// GET TODAY COUNTER
// =====================================================

export async function getTodayCounterService() {
  try {
    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    return await CounterMaster.findOne({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });
  } catch (error) {
    console.error("Error getting today's counter:", error);
    throw error;
  }
}
