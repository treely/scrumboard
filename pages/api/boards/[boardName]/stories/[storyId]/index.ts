import { NextApiRequest, NextApiResponse } from 'next';
import Story from '../../../../../../api/models/Story';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  switch (req.method) {
    case 'DELETE':
      await Story.sync();
      try {
        await Story.destroy({
          where: { id: req.query.storyId, boardName: req.query.boardName },
        });
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res.status(404).json({ message: 'Not found' });
      break;
  }
};
