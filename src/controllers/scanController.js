import scanService from "../services/scanService.js";

// endpoint to scan user
export const scanUser = async (req, res) => {
  try {
    const { code } = req.params;
    const activityData = req.body;
    const activity = await scanService.scanUser(code, activityData);

    if (!activity) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(activity);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error scanning user", error: error.message });
  }
};

// endpoint to get all scans
export const getScans = async (req, res) => {
  try {
    // get query params
    const { min_frequency, max_frequency, activity_category } = req.query;

    const scans = await scanService.scans({
      min_frequency,
      max_frequency,
      activity_category,
    });

    if (scans.length === 0) {
      return res.status(404).json({ message: "No scans found" });
    }

    res.status(200).json(scans);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching scan data", error: error.message });
  }
};
