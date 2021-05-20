export const getSelectedItem = function(array) {
    if(!Array.isArray(array) || array.length == 0) return;
    
    return array.find(item => item.selected);
}