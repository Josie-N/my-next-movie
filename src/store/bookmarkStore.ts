import create from 'zustand';
import {sortBookmarks, doesBookmarkIdHaveValidFormat, isCurrentBookmarkSmallerThanLastBookmark, extractBookmarkIdNumbers} from "./utils/helper";
interface BookmarkState {
  bookmarkIds: string[];
  lastReturnedBookmarkIndex: number;
  wasPreviousBookmarkCalled: boolean;
  nextBookmarkId: string;
}

// Methods for managing and interacting with the bookmark state
interface BookmarkStore extends BookmarkState {
  storeBookmarkId: (id: string) => void;
  removeBookmarkId: (id: string) => void;
  getNextBookmarkId: () => string;
}

const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarkIds: [],
  lastReturnedBookmarkIndex: 0,
  wasPreviousBookmarkCalled: false,
  nextBookmarkId: '',

  storeBookmarkId: (id) => {
    set((state) => {
      const lastReturnedBookmarkId = state.bookmarkIds[state.lastReturnedBookmarkIndex];
      const { currentBookmarkNumber, lastReturnedBookmarkNumber } = extractBookmarkIdNumbers(id, lastReturnedBookmarkId);

      // Exit the function early if the id already exists in the array, to prevent duplicates
      const idAlreadyExists = state.bookmarkIds.indexOf(id) !== -1;
      if (idAlreadyExists) return state;

      // Check if the id has a valid format
      const validFormat = doesBookmarkIdHaveValidFormat(id);
      if (!validFormat) {
        console.error(`Error: '${id}' contains no digits, which is not allowed as a bookmark id.`);
      }

      // Add the id to the array and sort it
      const sortedBookmarks = sortBookmarks([...state.bookmarkIds, id]);

      // Issue:
      // Adding a smaller number than the previous one will push the index forward by 1 and desynchronize it
      // Example:
      // [1, 5*, 10] -> index points to 1 (value of 5)
      // 3 is added to the array
      // [1, 3*, 5, 10] -> index still points to 1 (now value of 3)
      // Solution:
      // [1, 3, 5*, 10] -> index is shifted forward by 1 and now points to 2 (value of 5), the same as before
      const newLastReturnedBookmarkIndex =
        state.wasPreviousBookmarkCalled && isCurrentBookmarkSmallerThanLastBookmark(currentBookmarkNumber, lastReturnedBookmarkNumber)
          ? state.lastReturnedBookmarkIndex + 1
          : state.lastReturnedBookmarkIndex;

      const newState: BookmarkState = {
        ...state,
        bookmarkIds: sortedBookmarks,
        lastReturnedBookmarkIndex: newLastReturnedBookmarkIndex,
        nextBookmarkId: sortedBookmarks[newLastReturnedBookmarkIndex],
      };

      // Update the state of useBookmarkStore
      return newState;
    });
  },

  removeBookmarkId: (id) => {
    set((state) => {
      const indexOfIDBeingRemoved = state.bookmarkIds.indexOf(id);
      const lastReturnedBookmarkId = state.bookmarkIds[state.lastReturnedBookmarkIndex];
      const { currentBookmarkNumber, lastReturnedBookmarkNumber } = extractBookmarkIdNumbers(id, lastReturnedBookmarkId);

      const doesIdExist = indexOfIDBeingRemoved !== -1;
      if (!doesIdExist) return state;

      const newState: BookmarkState = {
        ...state,
        bookmarkIds: [...state.bookmarkIds],
      };

      // Remove the id from the array
      const howManyItemsToRemove = 1;
      newState.bookmarkIds.splice(indexOfIDBeingRemoved, howManyItemsToRemove);

      // Move the index back by 1 if an item was deleted AFTER it was already called by nextBookmarkId
      if (isCurrentBookmarkSmallerThanLastBookmark(currentBookmarkNumber, lastReturnedBookmarkNumber)) {
        newState.lastReturnedBookmarkIndex = state.lastReturnedBookmarkIndex - 1;
      }

      // Update the state of useBookmarkStore
      return newState;
    });
  },

  getNextBookmarkId: (): string => {
    set((state) => {
      const newState: BookmarkState = {
        ...state,
        wasPreviousBookmarkCalled: true,
        nextBookmarkId: state.bookmarkIds[state.lastReturnedBookmarkIndex],
      };

      // Exit the function early if there are no bookmarks in the array, to prevent 1 % 0 returning NaN
      const noBookmarksExist = state.bookmarkIds.length === 0;
      if(noBookmarksExist) return newState;

      // Moves the index forward to the next bookmark stored in the array
      // Modulo operator (%) wraps the index to the beginning of the array if exceeds the array length
      newState.lastReturnedBookmarkIndex = state.wasPreviousBookmarkCalled
        ? (state.lastReturnedBookmarkIndex + 1) % state.bookmarkIds.length
        : 0;

      return newState;
    });

    // Return the next bookmark id
    return useBookmarkStore.getState().bookmarkIds[useBookmarkStore.getState().lastReturnedBookmarkIndex];
  },
}));

export default useBookmarkStore;
