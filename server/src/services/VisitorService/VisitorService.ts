import VisitorModel from "../../models/VisitorModel/VisitorModel.js";
import { hashIp } from "../../utils/visitorUtils.js";

interface TrackVisitorParams {
  ip: string;
  sessionId: string;
}

interface TrackVisitorResult {
  counted: boolean;
  reason: "new_visitor" | "already_counted" | "counted_again";
}

export const trackVisitor = async ({
  ip,
  sessionId,
}: TrackVisitorParams): Promise<TrackVisitorResult> => {
  const ipHash = hashIp(ip);

  const now = new Date();

  const twentyFourHoursAgo = new Date(
    now.getTime() - 24 * 60 * 60 * 1000
  );

  const existingVisitor = await VisitorModel.findOne({
    ipHash,
  });

  if (existingVisitor) {
    if (existingVisitor.lastVisitedAt >= twentyFourHoursAgo) {
      return {
        counted: false,
        reason: "already_counted",
      };
    }

    existingVisitor.sessionId = sessionId;
    existingVisitor.lastVisitedAt = now;

    await existingVisitor.save();

    const totalVisitors = await VisitorModel.countDocuments();

    

    console.log("=================================");
    console.log(`Total visitors: ${totalVisitors}`);
    console.log("=================================");

    return {
      counted: true,
      reason: "counted_again",
    };
  }

  try {
    await VisitorModel.create({
      sessionId,
      ipHash,
      lastVisitedAt: now,
    });

    const totalVisitors = await VisitorModel.countDocuments();

    console.log(`Total visitors: ${totalVisitors}`);

    return {
      counted: true,
      reason: "new_visitor",
    };
  } catch (error: any) {
    if (error?.code === 11000) {
      return {
        counted: false,
        reason: "already_counted",
      };
    }

    throw error;
  }
};