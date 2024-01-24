import create from 'zustand';
import {extractNumberFromBookmarkId, sortBookmarks, doesBookmarkIdHaveValidFormat} from "./utils/helper";
interface BookmarkState {
  bookmarkIds: string[];
  lastReturnedBookmarkIndex: number;
  wasPreviousBookmarkCalled: boolean;
  nextBookmarkId: string;
}

interface BookmarkStore extends BookmarkState {
  storeBookmarkId: (id: string) => void;
  removeBookmarkId: (id: string) => void;
  setNextBookmarkId: () => string;
  nextBookmarkId: string;
}

// bookmark manager vs bookmark store

const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarkIds: [],
  lastReturnedBookmarkIndex: 0,
  wasPreviousBookmarkCalled: false,
  nextBookmarkId: '',

  storeBookmarkId: (id) => {
    set((state) => {
      console.log('state inside store function: ', state);
      console.log('lastReturnedBookmarkIndex: ', state.lastReturnedBookmarkIndex);

      // Verdict: lastReturnedBookmarkIndex is always 0
      const lastReturnedBookmarkId = state.bookmarkIds[state.lastReturnedBookmarkIndex];
      // Initially undefined, then always 'item-number-0'
      console.log('lastReturnedBookmarkId: ', lastReturnedBookmarkId);

      if (state.bookmarkIds.indexOf(id) !== -1) {
        return state;
      }

      const validFormat = doesBookmarkIdHaveValidFormat(id);
      if (!validFormat) {
        console.error(`Error: '${id}' contains no digits, which is not allowed as a bookmark id.`);
      }

      const currentBookmarkNumber = extractNumberFromBookmarkId(id);
      const lastReturnedBookmarkNumber = extractNumberFromBookmarkId(lastReturnedBookmarkId);

      const sortedBookmarks = sortBookmarks([...state.bookmarkIds, id]);

      // This is where the real issue is:
      // The condition always return false, so it defaults to the second position
      // The second position for some reason is always 0
      // false && false
      console.log('both booleans together:', state.wasPreviousBookmarkCalled && currentBookmarkNumber <= lastReturnedBookmarkNumber)
      console.log(' currentBookmarkNumber <= lastReturnedBookmarkNumber: ', currentBookmarkNumber <= lastReturnedBookmarkNumber);
      console.log(' wasPreviousBookmarkCalled: ', state.wasPreviousBookmarkCalled);

      console.log('currentBookmarkNumber: ', currentBookmarkNumber);
      // Always returns 0
      // Example: true && 9 <= 0
      console.log('lastReturnedBookmarkNumber: ', lastReturnedBookmarkNumber);

      const newLastReturnedBookmarkIndex =
        state.wasPreviousBookmarkCalled && currentBookmarkNumber <= lastReturnedBookmarkNumber
          ? state.lastReturnedBookmarkIndex + 1
          : state.lastReturnedBookmarkIndex;

      const newState: BookmarkState = {
        ...state,
        bookmarkIds: sortedBookmarks,
        lastReturnedBookmarkIndex: newLastReturnedBookmarkIndex,
        nextBookmarkId: sortedBookmarks[newLastReturnedBookmarkIndex],
      };

      console.log('storeBookmarkId state: ', newState);
      return newState;
    });
  },

  removeBookmarkId: (id) => {
    set((state) => {
      const indexOfIDBeingRemoved = state.bookmarkIds.indexOf(id);
      const valueExists = indexOfIDBeingRemoved !== -1;

      if (!valueExists) {
        return state;
      }

      const lastReturnedBookmarkId = state.bookmarkIds[state.lastReturnedBookmarkIndex];
      const currentBookmarkNumber = extractNumberFromBookmarkId(id);
      const lastReturnedBookmarkNumber = extractNumberFromBookmarkId(lastReturnedBookmarkId);

      const newState: BookmarkState = {
        ...state,
        bookmarkIds: [...state.bookmarkIds],
      };

      const howManyItemsToRemove = 1;
      newState.bookmarkIds.splice(indexOfIDBeingRemoved, howManyItemsToRemove);

      if (currentBookmarkNumber <= lastReturnedBookmarkNumber) {
        newState.lastReturnedBookmarkIndex = state.lastReturnedBookmarkIndex - 1;
      }

      return newState;
    });
  },

  setNextBookmarkId: (): string => {
    set((state) => {
      const newState: BookmarkState = {
        ...state,
        wasPreviousBookmarkCalled: true,
      };

      newState.nextBookmarkId = newState.bookmarkIds[newState.lastReturnedBookmarkIndex];

      console.log('wasPreviousBookmarkCalled: ', state.wasPreviousBookmarkCalled);
      console.log('lastReturnedBookmarkIndex before ', state.lastReturnedBookmarkIndex);

      // Returns NaN
      // This is were the bug is
      console.log('(state.lastReturnedBookmarkIndex + 1) % state.bookmarkIds.length: ', (state.lastReturnedBookmarkIndex + 1) % state.bookmarkIds.length);
      console.log('(state.lastReturnedBookmarkIndex + 1)', (state.lastReturnedBookmarkIndex + 1));
      console.log('state.bookmarkIds.length: ', (state.bookmarkIds.length));

      console.log(1 % 0);

      // NEW CODE:
      // TO DO: REVIEW AGAIN TOMORROW
      // To prevent 1 % 0 returning NaN, exit early if there are no bookmarks in the array
      if(state.bookmarkIds.length === 0)  {
       return newState;
      }

      console.log('will this still run?');
      // true the second time around
      newState.lastReturnedBookmarkIndex = state.wasPreviousBookmarkCalled
        ? (state.lastReturnedBookmarkIndex + 1) % state.bookmarkIds.length
        : 0;

      // Increments as expected
      console.log('lastReturnedBookmarkIndex after: ', newState.lastReturnedBookmarkIndex);

      console.log('setNextBookmarkId state: ', newState);
      return newState;
    });

    console.log('setNextBookmarkId result: ', useBookmarkStore.getState().bookmarkIds[useBookmarkStore.getState().lastReturnedBookmarkIndex])
    return useBookmarkStore.getState().bookmarkIds[useBookmarkStore.getState().lastReturnedBookmarkIndex];
  },
}));

export default useBookmarkStore;

// 1. id
// 2. function to store id in the array
// 3. function to remove id from the array


// id example = 'bookmark-item-3'

// Bookmark manager should have the following functions:
// store (id)
// remove (id)
// nextBookmarkId ()


// const bookmarks = [ 'bookmark1', 'bookmark2', 'bookmark3' ]
// 'bookmark4'
//  [ 'bookmark1', 'bookmark2', 'bookmark3', 'bookmark4' ]
